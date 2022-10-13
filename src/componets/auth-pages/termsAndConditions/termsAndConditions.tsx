import * as React from 'react'
import { FormContainer } from '../../Standard UI/container/Container'
import { CustomizedPaper } from '../../Standard UI/paper/CustomizedPaper'
import { Box, Typography } from '@material-ui/core'
import { IconKeys, Icons } from '../../Standard UI/Icon'
import authContext from '../../../context/Api.context'
import {Text} from '../../Standard UI/Text/Text'

const style = {
    context:{
        margin:8
    },
    title:{
        marginTop:50,
        padding: 4,
        fontWeight: 'bold' as 'bold',
        fontSize: 16
    },
    redText : {
        margin:8,
        color:'red'
    },
    redHeadText : {
        marginTop:50,
        padding: 4,
        fontWeight: 'bold' as 'bold',
        fontSize: 16,
        color: 'red'
    }

}

export function TermsAndConditions(){

    return(
        <FormContainer>
            <CustomizedPaper>

                <Text style={{fontWeight: "bold", textAlign: "center", fontSize: 16, marginBottom: 16}}>Shipping Terms and Conditions</Text>
                <Text style={style.title}>၁။ Beexprss ဟုဆိုရာတွင် Beexprss နှင့် လက်တွဲလုပ်ကိုင်နေသော ကိုယ်စားလှယ်များအားလုံးအကျုံးဝင်ပါသည်။ </Text>
                <Text style={style.title}>၂။ အထွေထွေ</Text>
                <Text style={style.context}>(က) Beexprss မှ ပို့ဆောင်မှုအားလုံးသည် ယခုဖော်ပြပါ စည်းကမ်းချက်များ၏ အချက်အလက်များအတိုင်း လိုက်နာထားခြင်းဖြစ်သည်။ </Text>
                <Text style={style.context}>(ခ) ကုန်စည် ပို့ဆောင်မှု စည်းမျဉ်းစည်းကမ်းများသည် အကျိုးတူပူးပေါင်းလုပ်ကိုင်ခြင်းနှင့် သဘောတူစာချုပ်ချုပ်ဆိုမှုများ၏ အခြေခံလိုအပ်ချက်ဖြစ်သည်။ </Text>
                <Text style={style.context}>(ဂ) Beexprss ၏ လုပ်ပိုင်ခွင့်ရှိသူမှ သဘောတူညီမှု လက်မှတ်ရေးထိုးထားသော စည်းမျဉ်းစည်းကမ်းမှ အပ အခြား စည်းကမ်းချက်များနှင့် သဘောတူညီမှု ပြုလုပ်မည် မဟုတ်ပါ။ </Text>
                <Text style={style.context}>(ဃ) Beexprss နှင့် လက်တွဲလုပ်ကိုင်နေသော လုပ်ငန်းများသည် ပစ္စည်းစတင်ပို့သည့် အချိန်မှ စ၍ အောက်ပါစည်းမျဉ်းများအားသိရှိနားလည် သဘောတူပြီးဖြစ်သည်ဟု သတ်မှတ်ပါသည်။ </Text>
                <Text style={style.title}>၃။ ပစ္စည်းပို့ဆောင်မှု လုပ်ငန်းအဆင့်ဆင့်</Text>
                <Text style={style.context}>(က) Beexprss သည် အများပြည်သူ သယ်ယူပို့ဆောင်ရေး လုပ်ငန်းမဟုတ်ပါ။ အောက်ပါစည်းမျဉ်းစည်းကမ်းချက်များနှင့် ကိုက်ညီသည့် ကုန်ပစ္စည်း ၊ စာရွက်စာတမ်း အစရှိသည်တို့ကိုသာ သယ်ယူပို့ဆောင်ပေးပါသည်။ မည်သည့် ကုန်ပစ္စည်း ၊ စာရွက်စာတမ်း ဖြစ်စေ BeeXprss ၏ စည်းမျဉ်းစည်းကမ်းနှင့် မကိုက်ညီပါက သယ်ယူပို့ဆောင်ရန် ငြင်းပယ်ခွင့်ရှိပါသည်။</Text>
                <Text style={style.context}>(ခ) Beexprss မှ သယ်ယူပို့ဆောင်ရာတွင် မည်သည့် ယာဉ်အမျိုးအစားနှင့် မည်သည့် သယ်ယူပို့ဆောင်ရေး လုပ်ငန်းဖြစ်စေ ပို့ဆောင်ခွင့်ရှိပြီး ပစ္စည်းလက်ဝယ် ထားရှိခြင်းနှင့် ဂိုဒေါင်တွင် သိမ်းဆည်းခြင်း အဆင့်ဆင့်များ အား BeeXprss ၏စည်းကမ်းချက်များအရ သင့်တော်သလို စီစဉ်ပိုင်ခွင့် ရှိပါသည်။ </Text>
                <Text style={style.context}>(ဂ) စာရွက်စာတမ်းနှင့် ကုန်ပစ္စည်းများ လုံခြုံစိတ်ချမှုရှိစေရန် ထုတ်ပိုးပေးရမည်မှာ ပေးပို့သူ၏တာဝန်ဖြစ်ပြီး ပြန်လည်ထုတ်ပိုးရန် လိုအပ်မှသာ Beexprss မှ ပံ့ပိုးပေးမည်ဖြစ်ပါသည်။ </Text>
                <Text style={style.context}>(ဃ) ပေးပို့သူထံမှ စနစ်တကျလုံခြုံစွာ ထုတ်ပိုးထားခြင်းမရှိသော ပစ္စည်းများ၏ ပျက်စီးပျောက်ဆုံးမှုများကို Beexprss မှ တာဝန်ယူမည်မဟုတ်ပါ။ </Text>
                <Text style={style.context}>(င) ပစ္စည်းပေးပို့သူမှ ပစ္စည်းလက်ခံမည့်သူ၏ လိပ်စာ အချက်အလက်များကို အသေးစိတ် ဖော်ပြရန်လိုအပ်ပြီး စာရွက် (သို့မဟုတ်) ကုန်ပစ္စည်း အမျိုးအစားကို ဖော်ပြမှသာလျှင် မှန်ကန်တိကျစွာ ပို့ဆောင်ပေးနိုင်မည်ဖြစ်ပါသည်။ </Text>
                <Text style={style.context}>(စ) ပေးပို့သူ၏ ပေါ့လျော့မှုကြောင့်ဖြစ်ပေါ်လာသော ကြန့်ကြာမှုများ၊ ပျက်စီးမှုများနှင့် အခြားကုန်ကျစရိတ်များအား Beexprss မှ တာဝန်ယူမည်မဟုတ်ပါ။ </Text>
                <Text style={style.context}>(ဆ) ကုန်ပစ္စည်းလက်ခံသူသည် အိမ်တွင်မရှိလျှင်သော်လည်းကောင်း ၊ အခြားအကြောင်းပြချက်များကြောင့်သော်လည်းကောင်း နောက်ထပ်ပြန်လည်ပေးပို့ရန်လိုအပ်လျှင် ၃ကြိမ်အထိသာ အခမဲ့ ဆောင်ရွက်ပေးသွားမည်ဖြစ်ပြီး ၃ကြိမ်ကျော်လွန်ပါက ပို့ဆောင်ခကို ပေးပို့သူမှ ထပ်မံပေးဆောင်ရမည်ဖြစ်သည်။</Text>
                <Text style={style.context}>(ဇ) အလွန်အမင်းပေါ့ပါးသော ပစ္စည်းများ (သို့မဟုတ်) ၁ပေ ထုထည်တွင် 3kg အောက်လျော့နည်းသော ပစ္စည်းမျာအား ထုထည်နှုန်းထားတွက်ချက်နည်းဖြင့် တွက်ပေးမည်ဖြစ်သည်။ ထုထည်နှုန်းထားတွက်ချက်နည်း (Volume Matrix) (အလျား×အနံ×အမြင့်) cm / 6000) </Text>
                <Text style={style.context}>(စျ) AWB နံပါတ်အား အသုံးပြု၍ <a href="http://beexprss.com/">(www.beexprss.com)</a> တွင် မိမိတို့၏ ပစ္စည်းပို့ဆောင်မှု အခြေအနေ (Tracking) အား ဝင်ရောက်ကြည့်ရှုနိုင်ပါသည်။ </Text>
                <Text style={style.context}>(ည) ပစ္စည်းလက်ခံသူသည် ပစ္စည်းလက်ခံသည်နှင့် တစ်ခါတည်းစစ်ဆေးပြီးမှ လက်ခံလက်မှတ်ရေးထိုးပေးရမည်။ ထို့ကြောင့် လက်ခံရယူသော ပစ္စည်းများအား ကောင်းမွန်စွာ လက်ခံရယူပြီးစီးကြောင်း သတ်မှတ်ပါသည်။ </Text>
                <Text style={style.title}>၄။ ပစ္စည်းပို့ဆောင်မှု စစ်ဆေးခြင်း</Text>
                <Text style={style.context}>(က) Beexprss မှ ပေးပို့မှု အမျိုးအစား အလိုက် တင်ပို့ပြီး ကုန်ပစ္စည်းများ၏ အခြေအနေကောင်းမွန် မှုများကို သိရှိရန် စစ်ဆေးခြင်း၊ ရောက်ရှိမှုစစ်ဆေးခြင်းအား လုပ်ဆောင်မှုအဆင့်ဆင့်ဖြင့် လုပ်ဆောင်မည်ဖြစ်ပြီး ၎င်းပစ္စည်းအတွက် တာဝန်ရှိမှုများနှင့် မသက်ဆိုင်ပေ။ </Text>
                <Text style={style.context}>(ခ) မည်သည့်မြို့နယ်တွင်မဆို တရားဥပဒေနှင့် မလွတ်ကင်းသည့် ပစ္စည်းများအား Beexprss မှတာဝန်ယူမည်မဟုတ်ပါ။ </Text>
                <Text style={style.context}>(ဂ) ပေးပို့သူထံမှ တိကျသေချာစွာ ဖော်ပြခြင်းမရှိသည့် ကုန်ပစ္စည်းများအတွက် Beexprss မှ တာဝန်ယူမည်မဟုတ်ပါ။</Text>
                <Text style={style.context}>(ဃ) သက်ဆိုင်ရာ ကားဂိတ်များ၊ အခွန်ရုံးများနှင့် တာဝန်ရှိရုံးများတွင် စစ်ဆေးခြင်း ကိစ္စရပ်များအတွက် ပေးပို့သူ၏ ပစ္စည်း ပျက်စီး ဆုံးရှုံးမှုများကို Beexprss မှ တာဝန်ယူမည်မဟုတ်ပါ။ </Text>
                <Text style={style.redHeadText}>၅။ သယ်ယူခွင့်မရှိသောပစ္စည်းများ</Text>
                <Text style={style.redText}>(က) Beexprss မှ အန္တရာယ်ရှိစေသည့် ပစ္စည်းများ၊ ပေါက်ကွဲမီးလောင်လွယ်သည့် ပစ္စည်းများ၊ တားမြစ်ဆေးဝါးများ၊ ရွှေထည် ငွေထည်၊ ပြင်းထန်စွာ ပေါက်ကွဲစေတတ်သော ပစ္စည်းများ၊ ဗျောက်များ၊ ငွေချေးစာရွက်များ၊ အကြွေစေ့များ၊ သေစေသော အဆိပ်များ၊ ရွှေဖြူ၊ တန်ဖိုးရှိသောကျောက်မျက်များ၊ သတ္ထုများ၊ တံဆိပ်ခေါင်းများ၊ ခိုးရာပါပစ္စည်းများ၊ ငွေပို့လွှာများ၊ ခရီးသွား ချက်လက်မှတ်များ၊ အများနှင့် သက်ဆိုင်သော လျို့ဝှက်စာချုပ်စာတမ်းများ၊ ရှေးဟောင်းပစ္စည်းများ၊ ပန်းချီကားများ၊ သက်ရှိသစ်ပင်နှင့် သက်ရှိတိရစ္ဆာန်များအား ပို့ဆောင်ပေးမည်မဟုတ်ပါ။</Text>
                <Text style={style.redText}>(ခ) အမှတ်စဉ် (၄.က) တွင်ဖော်ပြထားသည့်အတိုင်း ပေးပို့သူမှ BeeXprss သို့ ထုတ်ဖော်ပြောဆိုထားခြင်းမရှိသည့် ကုန်ပစ္စည်းများ၏ ပျက်စီးပျောက်ဆုံးမှုများကို Beexprss က တာဝန်ယူမည်မဟုတ်ပါ။ </Text>
                <Text style={style.redText}>(ဂ) အထက်ပါ စည်းမျဉ်းစည်းကမ်းချက်များအား ချိုးဖောက်ထားခြင်းများတွေ့ရှိပါက Beexprss မှ လုပ်ထုံးလုပ်နည်းများအတိုင်း အရေးယူဆောင်ရွက်သွားမည် ဖြစ်ပါသည်။</Text>
                <Text style={style.title}>၆။ ပို့ဆောင်မှုဆိုင်ရာ ပိုင်ဆိုင်မှုအာမခံခြင်း</Text>
                <Text style={style.context}>(က) ပေးပို့သူသည် ပေးပို့မည့် ပစ္စည်း၏ တရားဝင် ပိုင်ဆိုင်သူဖြစ်ကြောင်း အာမခံသူဖြစ်ပြီး Beexprss ၏ စည်းမျဉ်းစည်းကမ်းများအတိုင်း သဘောတူညီမှုရယူပြီး သူဖြစ်ရမည်။</Text>
                <Text style={style.context}>(ခ) တရားမဝင်သောပစ္စည်းများကြောင့် တရားစွဲဆိုခံရခြင်းတစုံတရာဖြစ်ပေါ်လာပါက Beexprss မှ ကင်းလွတ်ခွင့်ရှိသည်ကို ပေးပို့သူမှ သဘောတူပြီး ဖြစ်ရပါမည်။</Text>
                <Text style={style.title}>၇။ အခွန်ဆောင်ရသည့် သွင်းကုန်ထုတ်ကုန် ပစ္စည်းများ</Text>
                <Text style={style.context}>(က) Beexprss မှ ကုန်ပစ္စည်းပေးပို့သူနှင့် သဘောတူညီထားသည့်အတိုင်း အကောက်ခွန်ပေးဆောင်ရသည့် တန်ဖိုးအတိုင်း ကုန်ကျစရိတ်များကို တာဝန်ခံ ပေးပို့သူထံမှ ပြန်လည်တောင်းခံသွားမည်ဖြစ်သည်။</Text>
                <Text style={style.context}>(ခ) အကောက်ခွန်ပစ္စည်းများတွင် အခွန်၊ လေဆိပ်ခွန်များပါဝင်ပြီး လိုင်စင်ခွန် နှင့် သွင်းကုန် (သို့) ကြိုတင်ငွေများ မပါဝင်ပါ။ </Text>
                <Text style={style.context}>(ဂ) အရေးကြီးစာရွက်စာတမ်းများ (Document) ကို အထူးဈေးနှုန်းဖြင့် လုံခြုံစွာ ပို့ဆောင်ပေးပါမည်။  </Text>
                <Text style={style.redHeadText}>၈။ နစ်နာကြေး </Text>
                <Text style={style.redText}>(က) Beexprss မှ ဝန်ထမ်းများ၏ ပေါ့ဆမှုကြောင့်ဖြစ်စေ ကိုယ်စားလှယ်များ၏ပေါ့ဆမှုကြောင့်ဖြစ်စေ ပျက်စီး ပျောက်ဆုံးမှုများဖြစ်ပေါ်လာပါက ပစ္စည်းပေးပို့သူဘက်မှ ပစ္စည်းတန်ဖိုးကို အထောက်အထားခိုင်လုံစွာတင်ပြရပါမည်။</Text>
                <Text style={style.redText}>(ခ) ပစ္စည်းပျောက်ဆုံးမှု ဖြစ်ပေါ်ပါက ပို့ခ၏ အဆ (၂၀)အထိ အမြင့်ဆုံးပေးလျော်သွားမည်ဖြစ်ပြီး ပစ္စည်းတန်ဖိုးမှာ ပို့ခ၏ အဆ(၂၀)ထက်လျော့နည်းနေပါက ပစ္စည်းတန်ဖိုးအတိုင်း ပေးလျော်သွားမည်ဖြစ်သည်။</Text>
                <Text style={style.redText}>(ဂ) ပစ္စည်းပျက်စီးမှု ဖြစ်ပေါ်ပါက ပို့ခ၏ (၁၀)ဆ အထိ အမြင့်ဆုံးပေးလျော်သွားမည်ဖြစ်ပြီး ပစ္စည်းတန်ဖိုးမှာ ပို့ခ (၁၀)ဆ ထက်လျော့နည်းနေပါက ပစ္စည်းတန်ဖိုးအတိုင်း ပေးလျော်သွားမည်ဖြစ်သည်။ </Text>
                <Text style={style.title}>၉။ လျော်ကြေး တောင်းခံသည့် လုပ်ဆောင်မှုအဆင့်ဆင့် </Text>
                <Text style={style.context}>(က) လျော်ကြေးများအားလုံးကို ပေးပို့သူဘက်မှ စာဖြင့်ရေးသားတင်ပြရမည်ဖြစ်ပြီး ပစ္စည်းပို့ပြီး (၁၄) ရက် အတွင်း Beexprss သို့ စာရောက်ရှိရန် လိုအပ်ပါသည်။</Text>
                <Text style={style.context}>(ခ) ပေးပို့သူထံမှ ရရန်ရှိသည့် Beexprss ငွေတောင်းခံလွှာမှ နစ်နာကြေး သို့ လျော်ကြေးအား ဖြတ်တောက်ခြင်း နှင့် နစ်နာကြေးကြောင့် ပေးရန်ရှိသည်ကို ရပ်ဆိုင်းထားခြင်းအား ပေးပို့သူမှ ပြုလုပ်ခွင့်မရှိပါ။ ငွေတောင်းခံလွှာအား အတည်ပြုသဘောတူထားသည့် စာချုပ်ပါ ပေးချေမှုပုံစံအတိုင်း ပေးချေသွားရမည်ဖြစ်သည်။</Text>
                <Text style={style.title}>၁၀။ COD အိမ်အရောက်ငွေချေစနစ်</Text>
                <Text style={style.context}>(က) ရန်ကုန်မြို့တွင်း Area 1 နှင့် 2 တို့အတွက် 200000 ကျပ်အောက်ပါဆယ်များအား အခမဲ့ဝန်ဆောင်မှုပေးမည်ဖြစ်ပြီး ငွေကျပ် 200000 နှင့် အထက်ပါဆယ်တစ်ခုအတွက် 0.5% အား Service Charges အဖြစ်ကောက်ခံသွားမည်ဖြစ်ပါသည်။</Text>
                <Text style={style.context}>(ခ) ကောက်ခံရရှိသော COD များအား ပြန်လည်လွှဲပြောင်းရာတွင် ကျသင့်သော Bank Charges အား ပစ္စည်းပေးပို့သူဘက်မှ ကျခံပေးရမည်။</Text>
                <Text style={style.context}>(ဂ) Myanmar Post / Agent စသော ရန်ကုန်မြို့ပြင် နယ်သို့ပို့ဆောင်သော 200000ကျပ် အောက် ပါဆယ်များ၏ COD များအတွက် Service Charges 500 ကျပ်+ Bank Charges ကောက်ခံသွားမည်ဖြစ်သည်။ </Text>
                <Text style={style.context}>(ဃ) Myanmar Post / Agent စသော ရန်ကုန်မြို့ပြင် နယ်သို့ပို့ဆောင်သော 200000ကျပ် အထက် ပါဆယ်များ၏ COD များအတွက် Service Charges 0.5% + Bank Charges ကောက်ခံပါမည်။ </Text>
                <Text style={style.title}>၁၁။ အခြားအကြာင်းအရာများ </Text>
                <Text style={style.context}>(က) Beexprss သည် (၁၉၂၉) ခုနှစ် ဝါဆော ညီလာခံကို လိုက်နာသော သယ်ယူပို့ဆောင်ရေး ကုမ္ပဏီ မဟုတ်ပါ။ သို့ပါသောကြောင့် ပေးပို့သူကိုယ်စား ပေးပို့သူ၏ ခွင့်ပြုချက် မလိုအပ်ပဲ သယ်ယူပို့ဆောင်ရေး ကုမ္ပဏီမှ နစ်နာမှုများအတွက် လျော်ကြေးတောင်းခံခွင့်ရှိသည်။</Text>
                <Text style={{margin: 4, textAlign: "center"}}>----------------------------------------------------------------------------------------</Text>
                <Text style={{margin: 4}}>When shipper handed over his/her goods or documents in which to be delivered by BeeXprss (as defined below), every Shipper assumed to be agrees this Shipping Terms and Condition below:  </Text>
                <Text style={style.title}>1. BeeXprss including all BeeXprss agents which has been placed and registered based on their agreement with BeeXprss.</Text>
                <Text style={style.title}>2. General Condition</Text>
                <Text style={style.context}>a. Every transaction which is done by BeeXprss is based on terms and conditions which is stated on this shipping terms and conditions.</Text>
                <Text style={style.context}>b. Shipping Terms and Condition is a basic requirement which bind all parties and become part of any other written agreement.</Text>
                <Text style={style.context}>c. BeeXprss cannot being bonded by other agreement which is written in this Shipping Terms and Condition except agreed by signed by the BeeXprss authorized person who act on behalf of BeeXprss.</Text>
                <Text style={style.context}>d. BeeXprss will define as you understand the following conditions very well since the product launch.</Text>
                <Text style={style.title}>3. Shipment Procedure</Text>
                <Text style={style.context}>a. BeeXprss is not a public transportation and will only deliver goods and documents as per this terms and condition. BeeXprss has right to reject for delivery any goods or documents based on BeeXprss’s policy.</Text>
                <Text style={style.context}>b. BeeXprss has right to deliver Shipper’s goods or documents using any transportation mode or any transportation company and using handling process,  warehousing, and transportation mode which are proper and fit based on BeeXprss’s policy.</Text>
                <Text style={style.context}>c. Goods and document’s packaging for delivery is responsibility of Shipper including arrangement goods and documents inside a container which may supplied by BeeXprss.</Text>
                <Text style={style.context}>d. BeeXprss has no responsibility of damage or missing of the goods or document of part of it which is caused by improper packaging by Shipper.</Text>
                <Text style={style.context}>e. Shipper has responsibility to give detail address of destination, declare type of goods or and documents so it can be delivered in right way.</Text>
                <Text style={style.context}>f. BeeXprss has no responsibility for the delay, damage, missing, or other cost needed that caused negligence or failure of Shipper.</Text>
                <Text style={style.context}>g. If the receiver is not at home or may have other reasons then BeeXprss will give delivery service at least 3 times. If BeeXprss need to send the parcel extra 3 times then the sender have to give delivery charges again.</Text>
                <Text style={style.context}>h. BeeXprss will calculate for a very light parcel (or) under weight of 3 kg at 1 volume by the volume matrix. (Volume=Length × Width × High)</Text>
                <Text style={style.context}>i. If shipper want to track the condition of parcel then you can visit and search in our website <a href="http://beexprss.com/">(www.beexprss.com)</a> by using the AWB number.</Text>
                <Text style={style.context}>j. The receiver should sign only after took and checked the parcel. So BeeXprss will define as receiver received the parcel smoothly.</Text>
                <Text style={style.title}>4. Shipment Checking</Text>
                <Text style={style.context}>a. BeeXprss have right but not obligate to check goods or documents which is shipped to make sure that the goods and documents is proper to be transported to  destination city as per operational standard, Customs process, and delivery method of BeeXprss.</Text>
                <Text style={style.context}>b. BeeXprss in doing the delivery process is not guarantee and declare that all shipments is proper for transportation process without violating law which is valid in  all origin, destination or be passed cities.</Text>
                <Text style={style.context}>c. BeeXprss has no responsibility to the shipment which is wrong declared or unclear declared by Shipper.</Text>
                <Text style={style.context}>d. BeeXprss about fines, damage, or loss as goods or documents in Custom or other authorized unit. Shipper agree to release BeeXprss from the responsibility of those fines or loss or damage.</Text>
                <Text style={style.redHeadText}>5. Prohibited items</Text>
                <Text style={style.redText}>a. BeeXprss does not receive dangerous goods which is easy to explode or fired, prohibited drugs, gold and silver, dash, notes, coins, cyanide, platinum, and precious stone or metals, stamps, stolen goods, money order, traveler’s check, securities, antique goods, painting, live plant or animal.</Text>
                <Text style={style.redText}>b. If the Shipper send the goods without inform to BeeXprss, Shipper agree to release BeeXprss about the responsibility impact of claim or damage, or cost that  may be expense or sue from other parties for impact of this condition including right which is ruled in clause 4.a.</Text>
                <Text style={style.redText}>c. BeeXprss has right to do actions which is needed after BeeXprss knowledgeable about the violence of this rule including to do right which is ruled in clause 4.a</Text>
                <Text style={style.title}>6. Shipment Ownership Guarantee</Text>
                <Text style={style.context}>a. Shipper agree to guarantee that shipper is the legal owner and has right for the goods and documents which is handed over to BeeXprss and Shipper agree to be  bonded with this Shipping Terms and Condition.</Text>
                <Text style={style.context}>b. Shipper agree to release BeeXprss from sue from any parties and from all damage and/or other cost if any violences.</Text>
                <Text style={style.title}>7. Tariff</Text>
                <Text style={style.context}>a. BeeXprss will charge based on the listed tariff which is informed to Shipper from time to time to deliver Shipper’s goods and documents which is approved between BeeXprss and respective Shipper.</Text>
                <Text style={style.context}>b. Tariff provided is include tax, airport tax, but exclude duty, import retribution or deposit related to goods and documents.</Text>
                <Text style={style.context}>c. The most important documents will be delivered safely at special prices. </Text>
                <Text style={style.redHeadText}>8. Indemnity</Text>
                <Text style={style.redText}>a. In case of loss or damage caused by the negligence of Beexprss employees or agents, the sender of the goods must provide proof of the value of the goods. </Text>
                <Text style={style.redText}>b. If the item is lost, the maximum compensation will be up to (20) times of the shipping fee, and if the value of the item is less than (20) times of the shipping fee, the compensation will be according to the value of the item.</Text>
                <Text style={style.redText}>c. If damage to the item occurs, the maximum compensation will be up to (10) times of the shipping fee, and if the value of the item is less than (10) times of the shipping fee, the compensation will be according to the value of the item. </Text>
                <Text style={style.title}>9. Claim Procedure</Text>
                <Text style={style.context}>a. Every claim from Shipper related to BeeXprss’s responsibility should be stated in written and receiver by BeeXprss office maximum 14 days after goods and documents should be received in destination.</Text>
                <Text style={style.context}>b. Claim cannot be deducted from BeeXprss’s invoice.</Text>
                <Text style={style.title}>10. COD (Cash on Delivery)</Text>
                <Text style={style.context}>a. For Yangon Area 1 &amp; 2, if the cash is under 200,000 MMK then BeeXprss will give service free. If the cash is above 200,000 MMK for one parcel then we will collect money 0.5% as the service charges.</Text>
                <Text style={style.context}>b. When BeeXprss transfer the COD (cash on delivery), sender have to pay the bank charges.</Text>
                <Text style={style.context}>c. For Myanmar Post &amp; Agent (out of Yangon), BeeXprss will collect 500 MMK (service charges)+Bank charges for the parcel of under 200,000 MMK.</Text>
                <Text style={style.context}>d. For Myanmar Post &amp; Agent (out of Yangon), BeeXprss will collect 0.5% (service charges)+Bank charges for the parcel of above 200,000 MMK.</Text>
                <Text style={style.title}>11. Others</Text>
                <Text style={style.context}>a. BeeXprss is not a transportation company which is subjected to Warsaw Conference 1929. On behalf of Shipper, without reducing the Shipper’s right, BeeXprss can claim any compensation from transportation company.</Text>
                <Text style={{margin: 4, textAlign: "center"}}>----------------------------------------------------------------------------------------</Text>
                <Text style={style.title}>Software Terms of Service</Text>
                <Text style={style.context}>•	Devices and Software: You must provide certain devices, software, and data connections to use our services. For as long as you use our services, you consent to retrieve updated information about your activities or from us.</Text>
                <Text style={style.context}>•	Registration: You must register for our services using accurate data including address, provide your mobile phone number, and if you want to change it, contact us to update. You agree to receive text messages or phone calls from us with codes to register for our services.</Text>
                <Text style={style.context}>•	Data Policy: Your mobile phone number and information will be recorded in our system after you registered the app. Your receiver mobile phone number and others information will also be recorded in our system based on your using app function. You must access counting your data information and activities to make changes updated information from us, or for rewards, rating or other discount features.</Text>
                <Text style={style.context}>•	Acceptable Use: You must access and use our services only for legal, authorized, and acceptable purposes. You will not use or assist others in using our services in ways that: violate, misappropriate, or infringe the rights of BeeXprss. You must not use or assist others to access, use, copy, adapt, modify, prepare derivative works based upon distribute, transfer, display, perform, or otherwise exploit our services in impermissible or unauthorized manners, or in ways that impair, or harm us our services, systems, our users, or others, including that you must not directly or through automated means: (1) reverse engineer, modify, create derivative works from, decompile, or extract code from our services; (2) send, store, or transmit viruses or other harmful computer code through or onto our services; (3) gain or attempt to gain unauthorized access to our services or systems; (4) create accounts for our services through unauthorized or automated means; (5) collect the information of or about our users in any impermissible or unauthorized manner; (6) sell resell, rent, or charge for our services.</Text>
                <Text style={style.context}>•	Rights: We own all copyrights, trademarks, domains, logos, and other intellectual property rights associated with our services. You may not use our copyrights, trademarks, domains, logos, and other intellectual property rights unless you have our permission and except in accordance.</Text>
                <Text style={style.title}>How it works</Text>
                <Text style={style.context}>•	First, register with your mobile phone number and fill the requested information including address.  Then, you can start use ours app. Our app is working based on your mobile phone number to show all of the delivery transactions and activities. If you want to change your mobile phone number, please contact us.</Text>
                <Text style={style.context}>•	If you are our customer since beginning, we have your mobile phone number already recorded in our system. You can start register with this existing number, and then all of your activities will be shown.</Text>
                <Text style={style.context}> For more info:<a href="http://beexprss.com/#ContactUs">http://beexprss.com/#ContactUs</a></Text>
                <Text style={style.title}>Features</Text>
                <Text style={style.context}>•	Home screen shows total number of outgoing and incoming shipment, number of pickup order.</Text>
                <Text style={style.context}>•	To Me screen shows list of shipment (called AWB) list that are delivery to us with shipment information and real time status. In here, you can track the delivery status if you have our AWB number. And also you can modify new received date and address.</Text>
                <Text style={style.context}>•	From Me screen shows list of AWB that are delivery from us with shipment information and real time status. In here, you can check price of delivery and order to pick-up by filling in the requested pick-up form with details address. You can also make draft shipment order to send to your receivers. After you made draft shipment order (draft AWB), you also need to make pick-up order, then our courier will come and pick-up your shipment.</Text>
                <Text style={style.context}>•	History screen shows list of outgoing and incoming AWB with the status of cash on delivery (COD) and Delivery charges to get or to pay based on the payment type of shipments.</Text>
                <Text style={style.context}>•	COD Statement screen shows list of your COD collected amount for each shipment from receivers with Payment date and status.</Text>
                <Text style={style.context}>•	Redeem reward screen shows the list of rewards that can claim with points.</Text>
                <Text style={style.title}>Notice</Text>
                <Text style={style.context}>•	Your mobile phone number and information will be recorded in our system after you registered the app.</Text>
                <Text style={style.context}>•	Your receiver mobile phone number and information will also be recorded in our system after you made the draft shipment order (draft AWB).</Text>
                <Text style={style.context}>•	You can learn our terms and condition about delivery operation at: <a href="http://beexprss.com/#TandC">http://beexprss.com/#TandC</a></Text>


            </CustomizedPaper>
        </FormContainer>
    )
}
