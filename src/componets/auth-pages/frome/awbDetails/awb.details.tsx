import * as React from 'react'
import {useState} from 'react'
import {AppContainer, LeftContainer, RightContainer} from '../../../Standard UI/container/Container'
import {Box, CircularProgress, Modal, Typography} from '@material-ui/core'
import {IconKeys} from '../../../Standard UI/Icon'
import {ChargesAndCODContainer, GoodsContainer, QrCodeContainer, TypesContainer, UserDetailsBox} from '../fromMe.ui'
import history from '../../../history'
import frommeContext from '../../../../context/awb.context'
import {fromMeDetail, getLog} from "../../../../lib/api";
import {CustomizedButton} from "../../../Standard UI/button/CustomizedButton";
import {Colors} from "../../../res/color";
import * as moment from "moment";


export function AWBDetails(message?: any){
    const [state,dispatch] = React.useContext(frommeContext)
    const [items,setItems] = useState<any>([])
    const [loading,setLoading]= useState(true)
    const [progress, setProgress] = React.useState(false)
    const [progressPercent, setProgressPercent] = React.useState(0)
    const [open,setOpen] = React.useState(false)
    const [logData,setLogData] = useState([])
    const [logLoading,setLogLoading] = useState(false)
    const [logModal,setLogModal] = useState(false)
        React.useEffect(()=>{
        if(!state||!state.FromMeList||!state.FromMeList.id) history.push("/home/fromme")
        apiCall()
    },[])

    const apiCall = async () => {
        setLoading(true)
        try {
            let id = state.FromMeList.id
            const result = await fromMeDetail(id)
            console.log(result[0])
            setItems(result[0])
            return Promise.resolve(result.length)
        } catch (error) {
            alert(error)
            return Promise.reject()
        }
    }

    const getLogData = async () => {
        setLogLoading(true)
        const name = items.name
        getLog(name).then(data=>{
            setLogData(data)
            setLogLoading(false)
        }).catch((error)=>{
            setLogLoading(false)
            alert(error)
        })
    }

    if(!state||!state.FromMeList||!state.FromMeList.id) return <div />
    localStorage.setItem("@receiver_type",state.FromMeList.current_status.name == "[DLVD] Delivered" ? "true" : "false"  )
    const {FromMeList} = state

    const handleOpen = () => {
        getLogData()
        console.log("this is log data",logData)
        setOpen(true)
    }
    const handleClose = () => {
        setOpen(false)
    }



    // @ts-ignore
    return(
        <AppContainer>
            {
                items.length === 0 ? (
                    <div style={{justifyContent:"center",alignItems:"center",display:'flex',width:'100%',height:'100vh'}}>
                        <CircularProgress color="secondary" />
                    </div>
                ) : (
                    <>
                        <LeftContainer>
                            <QrCodeContainer {...items} />
                            <CustomizedButton buttonColor={Colors.THEME_PRIMARY_DARK} icon={IconKeys.log} label="Show Log" onClick={()=>{handleOpen()}}/>
                            <Modal
                                open={open}
                                onClose={handleClose}
                                aria-labelledby="modal-modal-title"
                                aria-describedby="modal-modal-description"
                            >
                                <div onClick={()=>handleClose()} style={{display:"flex",justifyContent:"center",alignItems:"center",height:'100vh'}}>
                                    <div style={{backgroundColor:Colors.WHITE,display:"inline-block",padding:'10px',borderRadius:'5px'}}>
                                        {
                                            logLoading ? (
                                                <div style={{justifyContent:"center",alignItems:"center",display:'flex',width:'100px',height:'100px'}}>
                                                    <CircularProgress color="secondary" />
                                                </div>
                                            ):(
                                                <ul>
                                                    {
                                                        logData.map((el : any,index)=>{
                                                            return(
                                                                <li key={index} >
                                                                    <Typography>
                                                                        {moment(el.updated_on).format("LLL") + "   "}
                                                                        <strong>
                                                                            {
                                                                                (el.message == "Arrived at") ? el.message + " " + el.depot : (el.message == "On Transport from") ? el.message + " " + el.depot : el.message
                                                                            }
                                                                        </strong>
                                                                    </Typography>
                                                                </li>
                                                            )
                                                        })
                                                    }

                                                </ul>
                                            )
                                        }
                                    </div>
                                </div>
                            </Modal>
                            <UserDetailsBox
                                userLabel="Sender"
                                text1={items.sender_id[1].split("]")[1]}
                                text2={items.sender_id[1].split("]")[0].split("[")[1]}
                                text3={items.sender_full_address}   />
                            <UserDetailsBox
                                userLabel="Receiver"
                                text1={items.receiver_id[1].split("]")[1]}
                                text2={items.receiver_id[1].split("]")[0].split("[")[1]}
                                text3={items.receiver_full_address}   />
                            { items.current_status[1].split("] ")[1] == "Out of Delivery" && <UserDetailsBox
                                userLabel="Courier"
                                text1={items.last_mile_pic_id[0]}
                                text2={items.last_mile_pic_id[1]} />}
                            <TypesContainer serviceType={items.service_type_id[1]} paymentType={items.payment_type_id[1]}/>
                            <ChargesAndCODContainer
                                cod_amount={items.cod_amount}
                                delivery_charges={items.delivery_charges}
                                other_cost={items.other_cost}
                                to_pay={items.cash_by_last_mile}
                                payment_type_id={items.payment_type_id}
                                extra={true}
                            />
                            <GoodsContainer description={items.description} remark={items.remark} weight={items.weight} />
                            {/*<TimeSeriesList log={items.log} />*/}
                        </LeftContainer>
                        <RightContainer />
                    </>
                )
            }
        </AppContainer>
    )
}
