import {v4 as uuidv4} from "uuid"
import PropertyTable from "./PropertyTable"
import NewPropertyBtn from "./NewPropertyBtn"

function ManagementBoard ({ objectItems }) {
    return <div className="management-board">
        <NewPropertyBtn key={uuidv4()}/>
        <PropertyTable key={uuidv4()} objectItems={objectItems}/>
    </div>
}

export default ManagementBoard