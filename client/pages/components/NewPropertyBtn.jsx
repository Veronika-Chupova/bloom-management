import { useRouter } from "next/router"
import { useDispatch } from "react-redux"
import {v4 as uuidv4} from "uuid"

function NewPropertyBtn () {
    const dispatch = useDispatch ()
    const router = useRouter()

    function handleBtnClick () {
        // dispatch ({ type:"NEW_OBJECT", objectID: uuidv4(), status: "Draft"})
        router.push("/new-property")
    }

    return <div>
        <div className="management-btn" onClick={handleBtnClick}>
            <h3>New Object</h3>
        </div>
    </div>
}

export default NewPropertyBtn