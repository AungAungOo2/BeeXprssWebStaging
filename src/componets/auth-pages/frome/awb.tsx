import * as React from 'react'
import { Typography, Box, Chip, Avatar, CircularProgress, LinearProgress, Button } from "@material-ui/core"
import { Icons, IconKeys } from '../../Standard UI/Icon'
import { FromMeItem } from './fromMe.ui'
import { fromMe, fromMeFilter } from '../../../lib/api'
import { FromMeList, SearchResponse } from '../../../lib/types/fromme.types'
import history from '../../history'
import frommeContext from '../../../context/awb.context'
import { getCity, cityProps, getTownship, townshipProps, getTownshipByCityId } from '../../../lib/storage/CityAndTownship'
import { ScrollListener } from '../../listener/ScrollListen'
import * as moment from 'moment';
import { AwbsFilter, AwbsFilterBar } from '../../Standard UI/filter/AwbFilter';
import { Excel } from '../../../lib/excel/excel';

export interface ChipObject { 
    key : string, 
    value : string
}

export function AWBList() {

    const [items, setItems] = React.useState<Array<FromMeList>>([])
    const [filterItems, setFilterItems] = React.useState<Array<FromMeList>>([])
    const [printItems, setPrintItems] = React.useState<Array<FromMeList>>([])
    const [state, dispatch] = React.useContext(frommeContext)
    const [oneTimeCall, setOneTimeCall] = React.useState(false)
    const [filterOneTimeCall, setFilterOneTimeCall] = React.useState(false)
    const [loading, setLoading] = React.useState(false)
    const [openFilter, setOpenFilter] = React.useState(false)
    const [type, setType] = React.useState("name")
    const [valueType, setValueType] = React.useState("")
    const [filterName, setFilterName] = React.useState("")
    const [filterAWB, setFilterAWB] = React.useState("")
    const [filterPhone, setFilterPhone] = React.useState("")
    const [filterTownship, setFilterTownship] = React.useState<cityProps>()
    const [filterCity, setFilterCity] = React.useState<townshipProps>()
    const [filterDelivered, setFilterDelivered] = React.useState<boolean>(false)
    const [filterReceived, setFilterReceived] = React.useState<boolean>(false)
    const [filterStatus, setFilterStatus] = React.useState<boolean>(false)
    const [filterCod, setFilterCod] = React.useState<boolean>(false)
    const [filterReceiver, setFilterReceiver] = React.useState<boolean>(false)
    const currentDate = moment().format('YYYY-MM-DD')
    const [filterFromDate, setFilterFromDate] = React.useState<string | Date>(currentDate)
    const [filterToDate, setFilterToDate] = React.useState<string | Date>(currentDate)
    const [chipList, setChipList] = React.useState<Array<ChipObject>>([])
    const [filterMood, setFilterMood] = React.useState<boolean>(false)
    const [filterItemTotalCount, setFilterItemTotalCount] = React.useState<number>(0)
    const [progress, setProgress] = React.useState(false)
    const [progressPercent, setProgressPercent] = React.useState(0)

    window.onbeforeunload = function () {
        window.scrollTo(0, 0);
    }

    const apiCall = async (page = 0) => {
        try {
            const results = await fromMe(page)
            if (results) setItems([...items, ...results])
            return Promise.resolve(results.length)
        } catch (error) {
            alert(error.messge)
            return Promise.reject()
        } finally {
            setOneTimeCall(true)
        }
    }

    const apiFilterCall = async (page = 0) => {
        console.log(getRequestData())
        try {
            const results = await fromMeFilter(getRequestData(), page + 1)
        
            if (results.links.item_per_page > 0 ) {
                setFilterItems( prev => ([...prev, ...results.result]))
                setFilterItemTotalCount(results.links.item_count)
            }
            return Promise.resolve(results.result.length)
        } catch (error) {
            return Promise.reject()
        } finally {
            setFilterOneTimeCall(true)
        }
    }

    const apiGetAllFilter = async (page : number) => { 
        setProgress(true)
        try {
            const results : SearchResponse = await fromMeFilter(getRequestData(), page)
            
            if (results.links.item_per_page > 0 ) {
                setPrintItems(prev => ([...prev, ...results.result]));
                setProgressPercent(( (results.links.item_per_page + ( 10 * (page - 1))) / results.links.item_count ) * 100)
            }
           
            if(results.links.page_count == page){
                setTimeout(() => {
                    setProgressPercent(100)
                    setProgress(false)
                }, 1000)
            }else {
                apiGetAllFilter(page + 1)
            }
            
        } catch (error) {
            return Promise.reject()
        } 
        // finally {
        //     setOneTimeCall(true)
        // }
    }

    const _onClick = (param: FromMeList) => {
        dispatch({ FromMeList: param })
        history.push("/home/fromme/AWBDetails")
    }

    const RenderItemList = () => {
        let list: Array<JSX.Element> = []
        let data = filterMood ? filterItems : items
        let firstTime = filterMood ? filterOneTimeCall : oneTimeCall
        data.map((row, index) => {
            list.push(
                <FromMeItem
                    key={index}
                    id={row.name}
                    amount={row.delivery_charges}
                    create={row.awb_created_date}
                    to={row.receiver_id.name}
                    no={index + 1}
                    status={row.current_status.name.split("]")[1]}
                    onCLick={() => _onClick(row)}
                    colorCode={row.current_status.name.split("]")[0].replace("[", "").trim()}
                />
            )
        })
        if (data.length == 0 && firstTime) {
            return [<span />]
        }
        return list
    }

    React.useEffect(() => {
        apiCall()
    }, [])

    const _onCloseDialog = () => {
        setOpenFilter(false)
    }

    const _onFilter = async () => {
        setFilterMood(true)

        await setChipList([])
        await setFilterItems( prev => ([]) )
        await setPrintItems( prev => ([]) )
        await setOpenFilter(false)
        await setProgressPercent(0)
        
        var list : ChipObject[] = []
        if (filterFromDate != "" && filterToDate != "") list.push({ key: "date", value: filterFromDate + " to " + filterToDate })

        if (filterReceiver && type == "name" && filterName != "") list.push({ key: "type", value: filterName })
        else if (filterReceiver && type == "awb" && filterAWB != "") list.push({ key: "type", value: filterAWB })
        else if (filterReceiver && type == "phone" && filterPhone != "") list.push({ key: "type", value: filterPhone })
        else if (filterReceiver && type == "city" && filterCity?.name != "") list.push({ key: "type", value: filterCity?.name || "" })
        else if (filterReceiver && type == "township" && filterTownship?.name != "") list.push({ key: "type", value: filterTownship?.name || "" })

        if (filterStatus) list.push({ key: "delivered", value: filterDelivered ? "Delivered" : "Not Delivered" })
        if (filterCod) list.push({ key: "cod", value: filterReceived ? "Received" : "Not Received" })

        setChipList(list)
        apiFilterCall()
    }

    const _onOpenDialog = () => {
        //if (items.length == 0) return
        setOpenFilter(true)
    }

    const onChangeType = (e: React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement>) => {
        setType(e.target.value)
        setFilterName("")
        setFilterAWB("")
        setFilterPhone("")
        setFilterCity(undefined)
        setFilterTownship(undefined)
    }

    const onChangeTypeValue = (event: React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement>) => {
        setValueType(event.target.value)
        switch (type) {
            case "name": {
                setFilterName(event.target.value)
                break
            }
            case "awb": {
                setFilterAWB(event.target.value)
                break
            }
            case "phone": {
                setFilterPhone(event.target.value)
                break
            }
        }
    }


    const renderChipList = () => {
        let list: Array<JSX.Element> = []
        chipList.map((row, index) => {
            list.push(
                <Chip label={row.value}
                    color="primary"
                    style={{ paddingRight: 8, margin: 4 }}
                    avatar={<Avatar> <Icons name={IconKeys.CheckCircle} size={30} /> </Avatar>}
                />
            )
        })
        // if(chipList == 0 && oneTimeCall){
        //     return [<span />]
        // }
        return list
    }

    const getRequestData = () => {
        return {
            "date_from": filterFromDate,
            "date_to": filterToDate,
            "receiver": filterReceiver ? "True" : "False",
            "receiver_name": filterName,
            "receiver_phone": filterPhone,
            "awb_no": filterAWB,
            "city_id": filterCity?.id || "",
            "township_id": filterTownship?.id || "",
            "status": filterStatus ? "True" : "False",
            "cod": filterCod ? "True" : "False",
            "delivered": filterDelivered ? "True" : "False",
            "received": filterReceived ? "True" : "False",
        }
    }

    const clearFilter = () => {
        setFilterMood(false)
        setChipList([])
        setFilterItems([])
        window.location.reload();
    }

    const excelFormator = () => {
        if (printItems.length == 0) return
        const excelDataSet: Array<{}> = []
        printItems.map(row => {
            console.log("row : ", row)
            excelDataSet.push({
                "AWB No.": row.name,
                "Sender Name": row.sender_id.name,
                "Sender Phone": row.sender_mobile,
                "Receiver Name": row.receiver_id.name,
                "Receiver Phone": row.receiver_mobile,
                "Origin City": row.origin_city[1],
                "Origin Township": row.origin_twsp_id.name,
                "Destination City": row.dest_city[1],
                "Destination Township": row.dest_twsp_id.name,
                "Service Type": row.service_type_id.name,
                "Payment Type": row.payment_type_id.name,
                "COD Amount": row.cod_amount,
                "Delivery Charges": row.delivery_charges,
                "Other Cost": row.other_cost,
                "To Receive": row.payment_type_id.name == "Special Service" ? row.cod_amount - (row.delivery_charges + row.other_cost)  : row.cod_amount,
                "Goods Weight(kg)": row.weight,
                "Remark": row.remark,
                "Description": row.description,
                "Created Date": row.awb_created_date,
                "Deliverd Date": row.delivered_time,
                "Status": row.current_status.name.split("]")[1],
            })
        })

        return excelDataSet
    }

    return (

        <div>
            <AwbsFilter 
                searchType="fromme"
                openFilter = {openFilter}
                title = "Filter From Me"
                information = "Receiver Information"
                filterFromDate = {filterFromDate}
                onChangeFromDate = { (e) => setFilterFromDate(e.target.value) }
                filterToDate = {filterToDate}
                onChangeToDate = { (e) => setFilterToDate(e.target.value) }
                filterReceiver = {filterReceiver}
                onChangefilterReceiver = { () => setFilterReceiver(!filterReceiver) }
                type = {type}
                onChangeType = { e => onChangeType(e)}
                onChangeTypeValue = { e => onChangeTypeValue(e) }
                valueType = {valueType}
                onChangeCity = {(e, value) => setFilterCity(value) }
                onChangeTownship = { (e, value) => setFilterTownship(value) }
                filterStatus = {filterStatus}
                onChangefilterStatus = { () => setFilterStatus(!filterStatus) }
                filterDelivered = {filterDelivered}
                onChangefilterDelivered = { () => setFilterDelivered(!filterDelivered) }
                filterCod = {filterCod}
                onChangefilterCod = { () => setFilterCod(!filterCod) }
                filterCash = {filterReceived}
                onChangefilterCash = { () => setFilterReceived(!filterReceived)}
                onCloseDialog = { () => _onCloseDialog() }
                onFilter = { () => _onFilter() }/>

            <AwbsFilterBar 
                sheetName={"FromMe"}
                renderChipList = { () => renderChipList()} 
                filterMood = {filterMood}
                count= {printItems.length}
                progress={progress}
                progressPercent={progressPercent}
                totalCount={filterItemTotalCount}
                excelFormator={ excelFormator }
                getAllItems={ () => apiGetAllFilter(1)}
                clearFilter={ () => clearFilter()}
                onOpenDialog={ () => _onOpenDialog()}
                loading = {loading}/>

            { progress && <Box display="flex" alignItems="center">
                <Box width="100%" mr={1}>
                    <LinearProgress color="secondary" variant="buffer" valueBuffer={progressPercent} value={progressPercent} />
                </Box>
                <Box minWidth={35}>
                    <Typography variant="body2" color="textSecondary">{`${Math.round(
                     progressPercent
                    )}%`}</Typography>
                </Box>
                </Box> }

            { !filterMood && <ScrollListener cb={page => apiCall(page)}>
                { RenderItemList() }
            </ScrollListener> }

            { filterMood && <ScrollListener cb={page => apiFilterCall(page)}>
                { RenderItemList() }
            </ScrollListener> }
    
        </div>
    )
}
