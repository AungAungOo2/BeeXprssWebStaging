import * as React from 'react'
import {Paper, Container, Box, Typography, Tabs, Tab, makeStyles, CircularProgress, Modal} from "@material-ui/core"
import { ToMeList } from '../../../../lib/types/tome.types';
import {QrCodeContainer, SenderContainer, ReceiverContainer, TypesContainer,CostContainer, DescriptionContainer, timeSeriesList, CourierContainer} from './tome.details.ui'
import tomeContext from '../../../../context/tome.context';
import history from '../../../history';
import {fromMeDetail, getLog} from "../../../../lib/api";
import {useState} from "react";
import {Colors} from "../../../res/color";
import * as moment from "moment";
import {CustomizedButton} from "../../../Standard UI/button/CustomizedButton";
import {IconKeys} from "../../../Standard UI/Icon";

const useStyles = makeStyles({
    root: {
      marginTop:"10px",
      flexGrow: 1,
      padding:0
    },
  });



export function TomeDetails(){

    const [contextState,dispatch] = React.useContext(tomeContext)
    const [items,setItems] = useState<any>([])
    const [loading,setLoading]= useState(true)
    const [progress, setProgress] = React.useState(false)
    const [progressPercent, setProgressPercent] = React.useState(0)
    const [open,setOpen] = React.useState(false)
    const [logData,setLogData] = useState([])
    const [logLoading,setLogLoading] = useState(false)
    const [logModal,setLogModal] = useState(false)
    const state:ToMeList = contextState

    React.useEffect(()=>{
        apiCall()
        if(state&&!state.id) history.push("/home/tome")
    }, [])

    if(!state || !state.id) return <div />

    const apiCall = async () => {
        setLoading(true)
        try {
            let id = state.id
            const result = await fromMeDetail(id)
            console.log(result[0])
            setItems(result[0])
            setLoading(false)
            return Promise.resolve(result.length)
        } catch (error) {
            alert(error)
            setLoading(false)
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

    const handleOpen = () => {
        getLogData()
        console.log("this is log data",logData)
        setOpen(true)
    }
    const handleClose = () => {
        setOpen(false)
    }

    return(
        <Container maxWidth={false} style={{marginBottom:50}}>
            {
                loading ? (
                    <div style={{justifyContent:"center",alignItems:"center",display:'flex',width:'100%',height:'100vh'}}>
                        <CircularProgress color="secondary" />
                    </div>
                ):(
                    <Box display="flex" flexDirection="row">
                        <Box flexGrow={3} style={{paddingTop: "2%"}}>
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
                            {QrCodeContainer(items)}
                            <CustomizedButton buttonColor={Colors.THEME_PRIMARY_DARK} icon={IconKeys.log} label="Show Tracking" onClick={()=>{handleOpen()}}/>
                            {SenderContainer(items)}
                            {ReceiverContainer(items)}
                            {items.current_status[1].split('] ')[1] == "Out of Delivery" && CourierContainer(items)}
                            {TypesContainer(items)}
                            {CostContainer(items)}
                            {DescriptionContainer(items)}
                            {/*{timeSeriesList(state.log)}*/}
                        </Box>
                        <Box flexGrow={1} style={{paddingTop: "2%"}} />
                    </Box>
                )
            }

        </Container>
    )

}
