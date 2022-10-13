import * as React from 'react'
import { LeftContainer, RightContainer, AppContainer } from '../../../../Standard UI/container/Container'
import { CustomizedPaper } from '../../../../Standard UI/paper/CustomizedPaper'
import {Box, CircularProgress, Typography} from '@material-ui/core'
import frommeContext from '../../../../../context/awb.context'
import history from '../../../../history'
import * as moment from 'moment'
import {fromMeDetail} from "../../../../../lib/api";
import {useState} from "react";

export function ProofOfDelievery(props:any){
    const [state,dispatch] = React.useContext(frommeContext)
    const [loading,setLoading] = useState(true)
    const [items,setItems] = useState<any>([])

    React.useEffect(()=>{
        if(!state||!state.FromMeList||!state.FromMeList.id) history.push("/home/fromme")
        console.log(FromMeList)
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


    if(!state||!state.FromMeList||!state.FromMeList.id) return <div />
    const {FromMeList} = state

    return(
        <AppContainer>
            {
                items.length === 0 ? (
                    <div style={{justifyContent:"center",alignItems:"center",display:'flex',width:'100%',height:'100vh'}}>
                        <CircularProgress color="secondary" />
                    </div>
                ):(
                    <>
                        <LeftContainer>
                            <CustomizedPaper title="Proof Of Delievery">
                                <Box display="flex" flexDirection="row" style={{padding:10}}>
                                    <Box style={{width:200}}><Typography><b>Receiver Name</b></Typography></Box>
                                    <Box><Typography align="left">{items.receiver_id[1]}</Typography></Box>
                                </Box>
                                <Box display="flex" flexDirection="row"  style={{padding:10}}>
                                    <Box style={{width:200}}><Typography><b>Receiver Type</b></Typography></Box>
                                    <Box><Typography align="left">{items.recipient_type[1]||""}</Typography></Box>
                                </Box>
                                <Box display="flex" flexDirection="row"  style={{padding:10}}>
                                    <Box style={{width:200}}><Typography><b>Delievery Date</b></Typography></Box>
                                    <Box><Typography align="left"> {items.delivered_date}</Typography></Box>
                                </Box>
                            </CustomizedPaper>

                            <CustomizedPaper title="Receiver's Signature">
                                {FromMeList.signature ? <img src={`data:image/png;base64,${items.signature}`} width={"50%"} height={"50%"}/>: ''}
                            </CustomizedPaper>

                            <CustomizedPaper title="Delievery Address">
                                <a href={` https://www.google.com/maps/search/?api=1&query=${items.last_mile_lat},${items.last_mile_lon} `}>
                                    Click To See Delievry Address
                                </a>
                            </CustomizedPaper>
                        </LeftContainer>
                        <RightContainer />
                    </>
                )
            }

        </AppContainer>
    )
}
