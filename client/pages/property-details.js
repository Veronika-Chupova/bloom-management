import { useRouter } from "next/router"
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import {v4 as uuidv4} from "uuid"
import { wrapper } from "../store/store"
import { updateObject } from "../store/actions"
import PropertyPassport from "./components/PropertyPassport"

function PropertyDetails ({ objectID }) {
    const router = useRouter()
    const dispatch = useDispatch()
    const property = useSelector (state => state.items.find(element => String(element.objectID) === String(objectID)))
    const [renderReady, setRenderReady] = useState (false)

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

    return <>{renderReady ? <PropertyPassport key={uuidv4()} isReadOnly={true} property={property} /> : <></> }</>
}

export default PropertyDetails


// import React, { useEffect } from 'react';
// import { useDispatch } from 'react-redux';
// import { wrapper } from '../../store'; // Adjust path
// import { updateObject } from '../../actions'; // Adjust path

// function PropertyDetails({ fetchedData }) {
//     const dispatch = useDispatch();

//     // Dispatch Redux action to populate store with server-fetched data
//     useEffect(() => {
//         if (fetchedData) {
//             dispatch({ type: "UPDATE_OBJECT", payload: fetchedData });
//         }
//     }, [fetchedData, dispatch]);

//     return (
//         <div>
//             <h1>Property Details</h1>
//             {/* Render property details */}
//         </div>
//     );
// }

export const getServerSideProps = wrapper.getServerSideProps((store) => async (context) => {
        const { objectID } = context.query
        // const dispatch = store.dispatch

        // await updateObject (dispatch, objectID)
        return { props: {
                    objectID: objectID
                } 
        }
    })

// export default PropertyDetails;


        // // Fetch data from your server
        // const response = await fetch(`http://localhost:3500/get-latest/${objectID}`)
        // const data = await response.json()

        // // Return the data as props
        // return {
        //     props: {
        //         fetchedData: data.property || null, // Pass fetched data to the component
        //     },
        // }