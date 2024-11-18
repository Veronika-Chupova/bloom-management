import { useRouter } from "next/router"
import { useDispatch } from "react-redux"
import {v4 as uuidv4 } from "uuid"
import { updateObject } from "../../store/actions"
import TableRow from "./TableRow"

function PropertyTable ({ objectItems}) {
    const router = useRouter()
    const dispatch = useDispatch()

    async function handleRowClick (objectID) {
        // await updateObject (dispatch, objectID)
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
                {objectItems?.map( item => <TableRow 
                        key={uuidv4()}
                        handleRowClick = {handleRowClick} 
                        objectID = {item.objectID} 
                        status = {item.status} 
                        link = {item.link}
                        objectData = {item.objectData}
                    />            
                )}
            </tbody>
        </table>
    </div>
}

export default PropertyTable