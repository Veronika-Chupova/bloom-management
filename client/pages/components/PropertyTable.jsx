import { useRouter } from "next/router"
import { useDispatch } from "react-redux"
import { useState, useEffect } from "react"
import {v4 as uuidv4 } from "uuid"
import { updateObject } from "../../store/actions"
import TableRow from "./TableRow"

function PropertyTable ({ objectItems}) {
    const router = useRouter()
    const dispatch = useDispatch()
    const [sortedItems, setSortedItems] = useState()

    useEffect (() => {
        const draftObjects = objectItems?.filter (item => item?.status === "Draft")
        const activeObjects = objectItems?.filter (item => item?.status === "Active")
        const closedObjects = objectItems?.filter (item => item?.status === "Closed")

        setSortedItems( draftObjects.concat(activeObjects, closedObjects) )
    },[objectItems])

    async function handleRowClick (objectID) {
        router.push({
            pathname: "/property-details",
            query: {objectID: objectID}})        //make proper linking
    }

    return <div className="table-container">
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Address</th>
                    <th className="availability">Availability</th>
                    <th>Agent</th>
                    <th>Price</th>
                    <th>Link</th>
                    <th>Type</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
                {sortedItems?.map( item => <TableRow 
                        key={uuidv4()}
                        handleRowClick = {handleRowClick} 
                        objectID = {item.objectID} 
                        status = {item.status}
                        creator={item.creator} 
                        link = {item.link}
                        objectData = {item.objectData}
                    />            
                )}
            </tbody>
        </table>
    </div>
}

export default PropertyTable