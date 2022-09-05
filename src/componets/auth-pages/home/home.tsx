import * as React from 'react'
import { FormContainer,HomeContainer } from '../../Standard UI/container/Container'
import {Box, makeStyles, Grid, CircularProgress} from '@material-ui/core'
import { COLORS, Colors, IconColor } from '../../res/color';
import { getPromotionData, getRecordCount } from '../../../lib/api';
import { promotionProps } from '../../../lib/types/promotion.types';
import { CustomizedPaper } from '../../Standard UI/paper/CustomizedPaper';
import { HomeItems } from './home.ui';
import { IconKeys, Icons } from '../../Standard UI/Icon';
import {Carousel} from 'react-responsive-carousel';
import history from '../../history'
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { dashboardProps } from '../../../lib/types/home.types';
import  DialogInfo  from '../../../lib/Dialog/DialogInfo';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { FaAlignCenter } from 'react-icons/fa';
import {useState} from "react";

const useStyles = makeStyles(() => ({
    marqueeContainer:{
        padding:5,
        fontSize:16,
        color:Colors.THEME_SECONDARY,
        fontWeight:500
    }

}));

const styles = {
    dashboardPrimaryItemContainer:{
        margin:3,
        padding:5,
        backgroundColor:Colors.THEME_PRIMARY
    },
    dashboardSecondaryItemContainer:{
        margin:3,
        padding:5,
        backgroundColor:Colors.THEME_SECONDARY
    }
}

export function Home(){
    const classes = useStyles()
    const [promotion,setPromotion] = React.useState<promotionProps|null>(null)
    const [dashboard,setDashboard] = React.useState<any>(null)
    const [openDialog,setOpenDialog] = React.useState(false)
    const [loading,setLoading] = useState(true)

    const promotionDataApi = async () => {
       try {
            const res = await getPromotionData()
            setPromotion(res)
       } catch (error) {}
    }

    const promotionImage = () =>{

        const ui:JSX.Element[] = []
        if(!promotion || !promotion.slider || !promotion.slider.img_attachment) return ui

        promotion.slider.img_attachment.map(image=>{
            ui.push(
                <div key={image.id}>
                    <img src={`data:image/png;base64,${image.datas}`} />
                </div>
            )
        })
        return ui
    }

    const handleClose = () => {
        setOpenDialog(false);
    };

    const _onClick = (param:any) => {
        switch(param) {
            case "wallet": {
                setOpenDialog(true)
                break;
             }
            case "fromMe": {
                history.push("/home/fromme")
                break;
            }
            case "pickUp": {
                history.push("/home/fromme/")
                break;
            }
            case "checkPrice": {
                history.push("/home/fromme/quote")
               break;
            }
            case "points": {
                setOpenDialog(true)
                break;
            }
            case "toMe": {
                history.push("/home/tome")
                break;
            }
            case "draft": {
                history.push("/home/fromme")
                break;
            }
            case "track": {
               history.push("/home/tracking")
               break;
            }
            case "statement": {
                history.push("/home/statement")
                break;
             }
            default: {
               break;
            }
         }
    }

    React.useEffect(()=>{
        setLoading(true)
        promotionDataApi()
        getRecordCount().then(data=> {
            setDashboard(data)
            setLoading(false)
        }).catch((err)=>{
            alert(err)
            setLoading(false)
        })
    },[])

    return(
        <Box style={{marginBottom:50}}>
            { openDialog && <div>
              <Dialog
                open={openDialog}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >

                <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                   {"Coming Soon"}
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={()=> setOpenDialog(!openDialog)} color="primary">
                    OK
                  </Button>
                </DialogActions>
              </Dialog>
            </div> }

            <Box className={classes.marqueeContainer}>
                <div className="marquee">
                    <p> {promotion?.promo_message.message} </p>
                </div>

                {/* <marquee loop="infinite"> {promotion?.promo_message.message} </marquee> */}
            </Box>
            <HomeContainer paddingTop={1} containerStyle={{marginBottom:10}}>
                <Grid container>
                    <Grid item xs={1} />
                    <Grid item xs={5} >
                        <Grid container>
                            <Grid item xs={12}>
                                <CustomizedPaper containerStyle={styles.dashboardSecondaryItemContainer} onCLick={()=>_onClick("wallet")}>
                                    <HomeItems color={IconColor.THEME_PRIMARY} iconsName={IconKeys.wallet}  label="My Wallet" text="0"/>
                                </CustomizedPaper>
                            </Grid>
                            <Grid item xs={12}>
                                <CustomizedPaper containerStyle={styles.dashboardPrimaryItemContainer} onCLick={()=>_onClick("fromMe")}>
                                    <div style={{display:'flex',alignItems:"center"}}>
                                        <Icons name={IconKeys.fromMe} size={25} color={IconColor.THEME_SECONDARY} />
                                        <h3 style={{marginTop:'0px',marginBottom:'0px',marginLeft:'10px',color:IconColor.THEME_SECONDARY}}>From Me</h3>
                                    </div>
                                    {
                                        loading ? (
                                            <h2 style={{color:IconColor.THEME_SECONDARY}}>Loading ...</h2>
                                        ) : (
                                                <h2 style={{color:IconColor.THEME_SECONDARY}}>{dashboard? dashboard.from_me_count + " pcs" : ""}</h2>
                                        )
                                    }

                                </CustomizedPaper>
                            </Grid>
                            <Grid item xs={12}>
                                <CustomizedPaper containerStyle={styles.dashboardPrimaryItemContainer} onCLick={()=>_onClick("pickUp")}>
                                    <div style={{display:'flex',alignItems:"center"}}>
                                        <Icons name={IconKeys.pickup} size={25} color={IconColor.THEME_SECONDARY} />
                                        <h3 style={{marginTop:'0px',marginBottom:'0px',marginLeft:'10px',color:IconColor.THEME_SECONDARY}}>Pickup Order</h3>
                                    </div>
                                    {
                                        loading ? (
                                            <h2 style={{color:IconColor.THEME_SECONDARY}}>Loading ...</h2>
                                        ) : (
                                            <h2 style={{color:IconColor.THEME_SECONDARY}}>{dashboard?.pickup_count}</h2>
                                        )
                                    }
                                </CustomizedPaper>
                            </Grid>
                            {/* <Grid item xs={12}>
                                <CustomizedPaper containerStyle={styles.dashboardPrimaryItemContainer} onCLick={()=>_onClick("checkPrice")}>
                                    <HomeItems color={IconColor.THEME_SECONDARY} iconsName={IconKeys.quote}  label="Check Price" text={""}/>
                                </CustomizedPaper>
                            </Grid> */}
                            {/* <Grid item xs={12}>
                                <CustomizedPaper containerStyle={{...styles.dashboardItemContainer,...{backgroundColor:Colors.THEME_SECONDARY}}}>
                                    <HomeItems color={IconColor.THEME_PRIMARY} iconsName={IconKeys.wallet}  label="My Wallet" text="0MMK" />
                                    <HomeItems color={IconColor.THEME_PRIMARY} iconsName={IconKeys.myPoints}  label="My Points" text={0}/>
                                </CustomizedPaper>
                            </Grid> */}
                            <Grid container>
                                <Grid item xs={6}>
                                    <CustomizedPaper containerStyle={styles.dashboardPrimaryItemContainer} onCLick={()=>_onClick("checkPrice")}>
                                        <HomeItems color={IconColor.THEME_SECONDARY} iconsName={IconKeys.quote}  label="Check Price" text=""/>
                                    </CustomizedPaper>
                                </Grid>
                                <Grid item xs={6}>
                                <CustomizedPaper containerStyle={styles.dashboardPrimaryItemContainer} onCLick={()=>_onClick("track")}>
                                    <HomeItems color={IconColor.THEME_SECONDARY} iconsName={IconKeys.tracking}  label="Track Shipment" text={""}/>
                                </CustomizedPaper>
                            </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={5}>
                        {/* <CustomizedPaper containerStyle={{...styles.dashboardItemContainer,...{height:"98%"}}}>
                            <HomeItems color={IconColor.THEME_SECONDARY} iconsName={IconKeys.fromMe}  label="From Me" text={dashboard?.awb_from_me}/>
                            <HomeItems color={IconColor.THEME_SECONDARY} iconsName={IconKeys.add}  label="Draft AWB" text={dashboard?.temp}/>
                            <HomeItems color={IconColor.THEME_SECONDARY} iconsName={IconKeys.pickup}  label="Pick Up" text={dashboard?.booking}/>
                        </CustomizedPaper> */}
                        <Grid container>
                            <Grid item xs={11}>
                                <CustomizedPaper containerStyle={styles.dashboardSecondaryItemContainer} onCLick={()=>_onClick("points")}>
                                    <HomeItems color={IconColor.THEME_PRIMARY} iconsName={IconKeys.myPoints}  label="My Points" text="0"/>
                                </CustomizedPaper>
                            </Grid>
                            <Grid item xs={11}>
                                <CustomizedPaper containerStyle={styles.dashboardPrimaryItemContainer} onCLick={()=>_onClick("toMe")}>
                                    <div style={{display:'flex',alignItems:"center"}}>
                                        <Icons name={IconKeys.toMe} size={25} color={IconColor.THEME_SECONDARY} />
                                        <h3 style={{marginTop:'0px',marginBottom:'0px',marginLeft:'10px',color:IconColor.THEME_SECONDARY}}>To Me</h3>
                                    </div>
                                    {
                                        loading ? (
                                            <h2 style={{color:IconColor.THEME_SECONDARY}}>Loading ...</h2>
                                        ) : (
                                            <h2 style={{color:IconColor.THEME_SECONDARY}}>{dashboard? dashboard.to_me_count + " pcs" : ""}</h2>
                                        )
                                    }
                                </CustomizedPaper>
                            </Grid>
                            <Grid item xs={11}>
                                <CustomizedPaper containerStyle={styles.dashboardPrimaryItemContainer} onCLick={()=>_onClick("draft")}>
                                    <div style={{display:'flex',alignItems:"center"}}>
                                        <Icons name={IconKeys.fromMe} size={25} color={IconColor.THEME_SECONDARY} />
                                        <h3 style={{marginTop:'0px',marginBottom:'0px',marginLeft:'10px',color:IconColor.THEME_SECONDARY}}>Draft Shipment</h3>
                                    </div>
                                    {
                                        loading ? (
                                            <h2 style={{color:IconColor.THEME_SECONDARY}}>Loading ...</h2>
                                        ) : (
                                            <h2 style={{color:IconColor.THEME_SECONDARY}}>{dashboard? dashboard.draft_count + " pcs" : ""}</h2>
                                        )
                                    }
                                </CustomizedPaper>


                            </Grid>
                            <Grid item xs={11}>
                                <CustomizedPaper containerStyle={styles.dashboardPrimaryItemContainer} onCLick={()=>_onClick("statement")}>
                                    <HomeItems color={IconColor.THEME_SECONDARY} iconsName={IconKeys.statement}  label="COD Statement" text=""/>
                                </CustomizedPaper>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={1} />
                </Grid>
            </HomeContainer>

            {/* <Box display="flex" justifyContent="center" flexDirection="row">
                <Box flexGrow={2} minWidth={"26.5%"}></Box>
                <Box flexGrow={0.8}>
                    {
                        promotion?.slider.img_attachment.length &&
                        <Carousel infiniteLoop={true} autoPlay={true} showArrows={true} showThumbs={false}>
                            {promotionImage()}
                        </Carousel>
                    }
                </Box>
                <Box flexGrow={2} minWidth={"26.5%"}></Box>
            </Box> */}

        </Box>

    )
}
