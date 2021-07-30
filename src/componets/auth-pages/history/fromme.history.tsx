import * as React from 'react'
import { fromMe } from '../../../lib/api'
import { FromMeList } from '../../../lib/types/fromme.types'
import { HistoryItem } from './history.ui'
import { ScrollListener } from '../../listener/ScrollListen'



export function FroMeHistoryList(){

    const [items,setItems] = React.useState<Array<FromMeList>>([])
    const [oneTimeCall,setOneTimeCall] = React.useState(false)

    const apiCall = async (page = 0) =>{
        try {
            const results = await fromMe(page)
            if(results){
                setItems([...items,...results])
                setOneTimeCall(true)
            }
            return Promise.resolve(results.length)
        } catch (error) {
            setOneTimeCall(true)
            console.error(error)
            alert(error.messge)
            return Promise.reject()
        }
    }
    const createText = (item:FromMeList):string =>{
        return item.current_status.name.split('] ')[1] == "Delivered" ? "Received "+ item.cod_amount+" MMK from "+item.name+"." : "To receive "+ item.cod_amount+" MMK from "+item.name+"."
    }

    const RenderItemList = () =>{
        let list:Array<JSX.Element> =[]
        items.map((row,index)=>{
            list.push(
                <HistoryItem
                    colorCode={row.current_status.name.split("]")[0].replace("[","").trim()}
                    key={index}
                    create={row.log[0].updated_on}
                    status={row.current_status.name.split(']')[1]}
                    text={createText(row)}
                />
            )
        })
        if(items.length == 0 && oneTimeCall){
            return [<span />]
        }
        return list
    }

    React.useEffect(()=>{
        apiCall()
    },[])

    return(
        <ScrollListener cb={page=>apiCall(page)}>
            {RenderItemList()}
        </ScrollListener>
    )
    
}