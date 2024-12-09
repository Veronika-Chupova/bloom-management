import { useRouter } from "next/router"
import { useSelector } from "react-redux"
import {v4 as uuidv4} from "uuid"
import ManagementHeader from "./ManagementHeader"
import ObjectPreview from "./ObjectPreview"
import ObjectDetails from "./ObjectDetails"
import ObjectGallery from "./ObjectGallery"
import BackBtn from "./BackBtn"
import ManagementFooter from "./ManagementFooter"

function PropertyPassport ({ isReadOnly, property }) {
    const router = useRouter()
    const temporaryGallery = useSelector (state => state.temporaryGallery)
    const currentUser = useSelector (state => state.user)
    const gallery = property?.gallery || temporaryGallery
    const path = router.pathname

    function handleBackBtn () {
        router.push ("/property-management")
    }

    return <div className="property-passport">
    <ManagementHeader currentUser={currentUser}/>
    <BackBtn onClick={handleBackBtn}/>
    <div className="new-prop-board">
        <ObjectDetails isReadOnly={isReadOnly} property={property} />
        {!(path==="/new-property") && <ObjectGallery property={property} gallery={gallery}/>}
        <ObjectPreview property={property} gallery={gallery}/>
    </div>
    <ManagementFooter />
</div>
}

export default PropertyPassport