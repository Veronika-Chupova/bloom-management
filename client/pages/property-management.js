import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import ManagementHeader from "./components/ManagementHeader"
import ManagementBoard from "./components/ManagementBoard"
import ManagementFooter from "./components/ManagementFooter"
import getData from "../store/actions"
import {v4 as uuidv4} from "uuid"


function PropertyManagement () {
    const dispatch = useDispatch ()
    const router = useRouter()
    const objectItems = useSelector (state => state.items)
    const [renderReady, setRenderReady] = useState (false)

    useEffect (() => {
        getData(dispatch)
    }, [])          // stops working after several turns back
    useEffect (() => {        
        if (objectItems) {
            setRenderReady(true)
        }
    }, [objectItems])

    return <>{ renderReady ? 
    <div className="property-management-body">
        <ManagementHeader key={uuidv4()}/> {/*Autorisation*/}
        <ManagementBoard key={uuidv4()} objectItems={objectItems}/>
        <ManagementFooter key={uuidv4()}/>
    </div> : 
    <></> 
    }</>
}

export default PropertyManagement