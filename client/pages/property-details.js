import { useRouter } from "next/router"
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import {v4 as uuidv4} from "uuid"
import { wrapper } from "../store/store"
import { updateObject, authCheck } from "../store/actions"
import PropertyPassport from "./components/PropertyPassport"

export default function PropertyDetails ({ objectID }) {
    const router = useRouter()
    const dispatch = useDispatch()
    const property = useSelector (state => state.items.find(element => String(element.objectID) === String(objectID)))
    const [renderReady, setRenderReady] = useState (false)
    const [isReady, setReady] = useState (false)

    useEffect(() => {
        async function accessControl () {
            const user = await authCheck ()
            if (user) {
                setReady(true)
            } else {
                setReady(false)
                window.location.href = "/login"
            }
        }
        accessControl()
    }, [])
    
    useEffect (() => {        
            if (objectID) {
                updateObject (dispatch, objectID)
            }
    }, [])

    useEffect (() => {        
        if (property) {
            setRenderReady(true)
        }
    }, [property])

    return (isReady && renderReady) && <PropertyPassport isReadOnly={true} property={property} />
}

export const getServerSideProps = wrapper.getServerSideProps((store) => async (context) => {
        const { objectID } = context.query

        return { props: {
                    objectID: objectID
                } 
        }
    })