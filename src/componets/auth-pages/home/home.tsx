import * as React from 'react'
import {FormContainer, HomeContainer} from '../../Standard UI/container/Container'
import {
    Box,
    makeStyles,
    Grid,
    CircularProgress,
    FormControl,
    FormLabel,
    RadioGroup,
    FormControlLabel
} from '@material-ui/core'

import {COLORS, Colors, IconColor} from '../../res/color';
import {
    getPoint,
    getPromotionData,
    getRecordCount,
    getRedeemProducts,
    RedeemSubmit,
    RewardTaken
} from '../../../lib/api';
import {promotionProps} from '../../../lib/types/promotion.types';
import {CustomizedPaper} from '../../Standard UI/paper/CustomizedPaper';
import {HomeItems} from './home.ui';
import {IconKeys, Icons} from '../../Standard UI/Icon';
import {Carousel} from 'react-responsive-carousel';
import history from '../../history'
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import {dashboardProps} from '../../../lib/types/home.types';
import DialogInfo from '../../../lib/Dialog/DialogInfo';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {FaAlignCenter} from 'react-icons/fa';
import {useState} from "react";
import axios from "axios";
import {BASE_URL, GET_POINT} from "../../../lib/config";
import {Alert} from "@material-ui/lab";

const useStyles = makeStyles(() => ({
    marqueeContainer: {
        padding: 5,
        fontSize: 16,
        color: Colors.THEME_SECONDARY,
        fontWeight: 500
    }

}));

const styles = {
    dashboardPrimaryItemContainer: {
        margin: 3,
        padding: 5,
        backgroundColor: Colors.THEME_PRIMARY
    },
    dashboardSecondaryItemContainer: {
        margin: 3,
        padding: 5,
        backgroundColor: Colors.THEME_SECONDARY
    }
}

export function Home() {
    const classes = useStyles()
    const [promotion, setPromotion] = React.useState<promotionProps | null>(null)
    const [dashboard, setDashboard] = React.useState<any>(null)
    const [openDialog, setOpenDialog] = React.useState(false)
    const [loading, setLoading] = useState(true)
    const [point, setPoint] = useState("Loading...")
    const [rank, setRank] = useState("Loading...")
    const [redeemsProductList, setRedeemProductList] = useState([])
    const [rewardTakenList, setRewardTakenList] = useState([])
    const [redeemProductLoading, setRedeemProductLoading] = useState(false)
    const [redeemLoading, setRedeemLoading] = useState(false)
    const [selectedRewardTaken, setSelectedRewardTaken] = useState(false)
    const [selectedRedeemItem, setSelectedRedeemItem] = useState(true)
    const [selectedId, setSelectedId] = useState(null)

    const promotionDataApi = async () => {
        try {
            const res = await getPromotionData()
            setPromotion(res)
        } catch (error) {
        }
    }

    const promotionImage = () => {

        const ui: JSX.Element[] = []
        if (!promotion || !promotion.slider || !promotion.slider.img_attachment) return ui

        promotion.slider.img_attachment.map(image => {
            ui.push(
                <div key={image.id}>
                    <img src={`data:image/png;base64,${image.datas}`}/>
                </div>
            )
        })
        return ui
    }

    const handleClose = () => {
        setOpenDialog(false);
    };


    const _onClick = (param: any) => {
        switch (param) {
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

    React.useEffect(() => {
        setLoading(true)
        promotionDataApi()
        getUserPoint()
        getRecordCount().then(data => {
            setDashboard(data)
            setLoading(false)
        }).catch((err) => {
            alert(err)
            setLoading(false)
        })
    }, [])


    const getUserPoint = async () => {
        try {
            const res = await getPoint()
            setPoint(res.points)
            setRank(res.rank_name === false ? "No Rank" : res.rank_name)
        } catch (error) {
        }

    }

    const getRedeemProduct = () => {
        setOpenDialog(true)
        setRedeemProductLoading(true)
        getRedeemProducts().then((data) => {
            setRedeemProductList(data)
            setRedeemProductLoading(false)
        }).catch(() => {
            setRedeemProductLoading(false)
        })
    }

    const getRewardTaken = () => {
        setOpenDialog(true)
        setRedeemProductLoading(true)
        RewardTaken().then((data) => {
            setRewardTakenList(data)
            setRedeemProductLoading(false)
        }).catch(() => {
            setRedeemProductLoading(false)
        })
    }

    const redeemMethod = (item_id: any) => {

        let confirmRedeem = confirm("Are you sure want to redeem ?")
        if (confirmRedeem) {
            setRedeemLoading(true)
            setSelectedId(item_id)
            RedeemSubmit(item_id).then((data) => {
                setRedeemLoading(false)
                alert(data)
            }).catch(err => {
                alert("Point is not enough")
                setRedeemLoading(false)
            })
        } else {
            alert("NotSuccess")
        }
    }


    const chooseRedeemItems = async () => {
        console.log("ChooseRedeemItems")
        setSelectedRedeemItem(true)
        setSelectedRewardTaken(false)
        await getRedeemProduct()
    }

    const chooseRewardTaken = async () => {
        console.log("RewardTaken")
        setSelectedRedeemItem(false)
        setSelectedRewardTaken(true)
        await getRewardTaken()
    }

    return (
        <Box style={{marginBottom: 50}}>
            {openDialog && <div>
                <Dialog
                    fullWidth
                    open={openDialog}
                    onClose={handleClose}
                    style={{height: '90vh'}}
                    maxWidth="sm"
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >

                    <DialogContent style={{width: '100%', height: '80vh'}}>
                        <div style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                            marginBottom: '20px',
                            backgroundColor: COLORS.LIGHT_GREY,
                            padding: '7px',
                            borderRadius: '10px'
                        }}>
                            <div onClick={() => chooseRedeemItems()} style={{
                                width: '50%',
                                paddingTop: '10px',
                                paddingBottom: '10px',
                                backgroundColor: selectedRedeemItem ? COLORS.SECONDARY : COLORS.WHITE,
                                borderTopLeftRadius: '10px',
                                borderBottomLeftRadius: '10px'
                            }}>
                                <h3 style={{
                                    textAlign: "center",
                                    margin: '0px',
                                    color: selectedRedeemItem ? COLORS.WHITE : COLORS.BLACK
                                }}>RedeemItems</h3>
                            </div>
                            <div onClick={() => chooseRewardTaken()} style={{
                                width: '50%',
                                paddingTop: '10px',
                                paddingBottom: '10px',
                                backgroundColor: selectedRewardTaken ? COLORS.SECONDARY : COLORS.WHITE,
                                borderTopRightRadius: '10px',
                                borderBottomRightRadius: '10px'
                            }}>
                                <h3 style={{
                                    textAlign: "center",
                                    margin: '0px',
                                    color: selectedRewardTaken ? COLORS.WHITE : COLORS.BLACK
                                }}>Rewards Taken</h3>
                            </div>
                        </div>

                        <>
                            {
                                redeemProductLoading ? (
                                    <div style={{
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        height: '100%'
                                    }}>
                                        <CircularProgress/>
                                    </div>
                                ) : (
                                    <>
                                        {
                                            selectedRedeemItem ? (
                                                <>
                                                    {
                                                        redeemsProductList.map((data: any, index) => {
                                                            return (
                                                                <DialogContentText id="alert-dialog-description">
                                                                    <div style={{
                                                                        display: "flex",
                                                                        flexDirection: "row",
                                                                        backgroundColor: COLORS.THEME,
                                                                        padding: '10px',
                                                                        borderRadius: '10px'
                                                                    }}>

                                                                        <img style={{
                                                                            width: '120px',
                                                                            height: '120px',
                                                                            borderRadius: '10px'
                                                                        }}
                                                                             src={"data:image/png;base64," + data.item_image}
                                                                             alt=""/>
                                                                        <div
                                                                            style={{marginLeft: '10px', width: '100%'}}>
                                                                            <div style={{
                                                                                display: 'flex',
                                                                                flexDirection: "row",
                                                                                justifyContent: "space-between",
                                                                                alignItems: "center"
                                                                            }}>
                                                                                <p style={{margin: '0px'}}>{data.item_code}</p>
                                                                                <Button variant="contained"
                                                                                        onClick={() => redeemMethod(data.id)}
                                                                                        style={{backgroundColor: COLORS.SECONDARY}}
                                                                                        color="secondary">
                                                                                    {
                                                                                        (redeemLoading && selectedId === index + 1) ? (
                                                                                            <>
                                                                                                <div style={{
                                                                                                    display: "flex",
                                                                                                    flexDirection: "row",
                                                                                                    justifyContent: "center",
                                                                                                    alignItems: "center"
                                                                                                }}>
                                                                                                    <CircularProgress
                                                                                                        style={{marginRight: '5px'}}
                                                                                                        size={20}/>
                                                                                                    Loading
                                                                                                </div>
                                                                                            </>

                                                                                        ) : (
                                                                                            <>
                                                                                                Redeem
                                                                                            </>
                                                                                        )
                                                                                    }
                                                                                </Button>
                                                                            </div>
                                                                            <p style={{
                                                                                color: COLORS.SECONDARY,
                                                                                margin: '0px'
                                                                            }}>{data.name}</p>
                                                                            <p style={{
                                                                                color: 'red',
                                                                                margin: '0px'
                                                                            }}>{data.item_value} Points</p>
                                                                            <p style={{margin: '0px'}}>{data.item_code}</p>
                                                                        </div>
                                                                    </div>
                                                                </DialogContentText>
                                                            )
                                                        })
                                                    }
                                                </>
                                            ) : (
                                                <>
                                                    {
                                                        rewardTakenList ? (
                                                            <>
                                                                {
                                                                    rewardTakenList.map((data: any) => {
                                                                        return (
                                                                            // <DialogContentText id="alert-dialog-description">
                                                                            <div style={{
                                                                                display: "flex",
                                                                                flexDirection: "row",
                                                                                backgroundColor: COLORS.THEME,
                                                                                padding: '10px',
                                                                                borderRadius: '10px',
                                                                                width: '100%',
                                                                                marginBottom: "10px"
                                                                            }}>
                                                                                <div style={{
                                                                                    marginLeft: '10px',
                                                                                    width: '100%'
                                                                                }}>
                                                                                    <div style={{
                                                                                        display: "flex",
                                                                                        flexDirection: 'row',
                                                                                        justifyContent: "space-between",
                                                                                        width: '100%'
                                                                                    }}>
                                                                                        <h3 style={{margin: '0px'}}>{data.redeemed_item[1]}</h3>
                                                                                        <p style={{
                                                                                            color: data.state === "done" ? 'green' : 'red',
                                                                                            margin: '0px'
                                                                                        }}>{data.state.toUpperCase()}</p>
                                                                                    </div>
                                                                                    <p style={{
                                                                                        color: COLORS.SECONDARY,
                                                                                        margin: '0px'
                                                                                    }}>Redeem Date
                                                                                        - {data.redeemed_date}</p>
                                                                                    <p style={{margin: '0px'}}>Points
                                                                                        - {data.redeemed_points}</p>
                                                                                </div>
                                                                            </div>
                                                                            // </DialogContentText>
                                                                        )
                                                                    })

                                                                }
                                                            </>
                                                        ) : (
                                                            <div style={{
                                                                display: "flex",
                                                                justifyContent: "center",
                                                                alignItems: "center",
                                                                height: '100%'
                                                            }}>
                                                                <h3>Nothing to show data</h3>
                                                            </div>
                                                        )
                                                    }


                                                </>
                                            )
                                        }

                                    </>
                                )
                            }

                        </>


                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setOpenDialog(!openDialog)} color="secondary">
                            Close
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>}

            <Box className={classes.marqueeContainer}>
                <div className="marquee">
                    <p> {promotion?.promo_message.message} </p>
                </div>

                {/* <marquee loop="infinite"> {promotion?.promo_message.message} </marquee> */}
            </Box>
            <HomeContainer paddingTop={1} containerStyle={{marginBottom: 10}}>
                <Grid container>
                    <Grid item xs={1}/>
                    <Grid item xs={5}>
                        <Grid container>
                            <Grid item xs={12}>
                                <CustomizedPaper containerStyle={styles.dashboardSecondaryItemContainer}>
                                    <HomeItems color={IconColor.THEME_PRIMARY} iconsName={IconKeys.wallet}
                                               label={rank.toString()} text={point.toString()}/>
                                </CustomizedPaper>
                            </Grid>
                            <Grid item xs={12}>
                                <CustomizedPaper containerStyle={styles.dashboardPrimaryItemContainer}
                                                 onCLick={() => _onClick("fromMe")}>
                                    <div style={{display: 'flex', alignItems: "center"}}>
                                        <Icons name={IconKeys.fromMe} size={25} color={IconColor.THEME_SECONDARY}/>
                                        <h3 style={{
                                            marginTop: '0px',
                                            marginBottom: '0px',
                                            marginLeft: '10px',
                                            color: IconColor.THEME_SECONDARY
                                        }}>From Me</h3>
                                    </div>
                                    {
                                        loading ? (
                                            <h2 style={{color: IconColor.THEME_SECONDARY}}>Loading ...</h2>
                                        ) : (
                                            <h2 style={{color: IconColor.THEME_SECONDARY}}>{dashboard ? dashboard.from_me_count + " pcs" : ""}</h2>
                                        )
                                    }

                                </CustomizedPaper>
                            </Grid>
                            <Grid item xs={12}>
                                <CustomizedPaper containerStyle={styles.dashboardPrimaryItemContainer}
                                                 onCLick={() => _onClick("pickUp")}>
                                    <div style={{display: 'flex', alignItems: "center"}}>
                                        <Icons name={IconKeys.pickup} size={25} color={IconColor.THEME_SECONDARY}/>
                                        <h3 style={{
                                            marginTop: '0px',
                                            marginBottom: '0px',
                                            marginLeft: '10px',
                                            color: IconColor.THEME_SECONDARY
                                        }}>Pickup Order</h3>
                                    </div>
                                    {
                                        loading ? (
                                            <h2 style={{color: IconColor.THEME_SECONDARY}}>Loading ...</h2>
                                        ) : (
                                            <h2 style={{color: IconColor.THEME_SECONDARY}}>{dashboard?.pickup_count}</h2>
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
                                    <CustomizedPaper containerStyle={styles.dashboardPrimaryItemContainer}
                                                     onCLick={() => _onClick("checkPrice")}>
                                        <HomeItems color={IconColor.THEME_SECONDARY} iconsName={IconKeys.quote}
                                                   label="Check Price" text=""/>
                                    </CustomizedPaper>
                                </Grid>
                                <Grid item xs={6}>
                                    <CustomizedPaper containerStyle={styles.dashboardPrimaryItemContainer}
                                                     onCLick={() => _onClick("track")}>
                                        <HomeItems color={IconColor.THEME_SECONDARY} iconsName={IconKeys.tracking}
                                                   label="Track Shipment" text={""}/>
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
                                <CustomizedPaper containerStyle={styles.dashboardSecondaryItemContainer}
                                                 onCLick={() => getRedeemProduct()}>
                                    <HomeItems color={IconColor.THEME_PRIMARY} iconsName={IconKeys.myPoints} label=" "
                                               text="Redeems Rewards"/>
                                </CustomizedPaper>
                            </Grid>
                            <Grid item xs={11}>
                                <CustomizedPaper containerStyle={styles.dashboardPrimaryItemContainer}
                                                 onCLick={() => _onClick("toMe")}>
                                    <div style={{display: 'flex', alignItems: "center"}}>
                                        <Icons name={IconKeys.toMe} size={25} color={IconColor.THEME_SECONDARY}/>
                                        <h3 style={{
                                            marginTop: '0px',
                                            marginBottom: '0px',
                                            marginLeft: '10px',
                                            color: IconColor.THEME_SECONDARY
                                        }}>To Me</h3>
                                    </div>
                                    {
                                        loading ? (
                                            <h2 style={{color: IconColor.THEME_SECONDARY}}>Loading ...</h2>
                                        ) : (
                                            <h2 style={{color: IconColor.THEME_SECONDARY}}>{dashboard ? dashboard.to_me_count + " pcs" : ""}</h2>
                                        )
                                    }
                                </CustomizedPaper>
                            </Grid>
                            <Grid item xs={11}>
                                <CustomizedPaper containerStyle={styles.dashboardPrimaryItemContainer}
                                                 onCLick={() => _onClick("draft")}>
                                    <div style={{display: 'flex', alignItems: "center"}}>
                                        <Icons name={IconKeys.fromMe} size={25} color={IconColor.THEME_SECONDARY}/>
                                        <h3 style={{
                                            marginTop: '0px',
                                            marginBottom: '0px',
                                            marginLeft: '10px',
                                            color: IconColor.THEME_SECONDARY
                                        }}>Draft Shipment</h3>
                                    </div>
                                    {
                                        loading ? (
                                            <h2 style={{color: IconColor.THEME_SECONDARY}}>Loading ...</h2>
                                        ) : (
                                            <h2 style={{color: IconColor.THEME_SECONDARY}}>{dashboard ? dashboard.draft_count + " pcs" : ""}</h2>
                                        )
                                    }
                                </CustomizedPaper>


                            </Grid>
                            <Grid item xs={11}>
                                <CustomizedPaper containerStyle={styles.dashboardPrimaryItemContainer}
                                                 onCLick={() => _onClick("statement")}>
                                    <HomeItems color={IconColor.THEME_SECONDARY} iconsName={IconKeys.statement}
                                               label="COD Statement" text=""/>
                                </CustomizedPaper>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={1}/>
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
