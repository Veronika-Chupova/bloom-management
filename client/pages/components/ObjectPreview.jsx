import {v4 as uuidv4} from "uuid"
import PropertyCard from "./PropertyCard"

function ObjectPreview ({ property, gallery }) {
    return <div className="object-section">
        <h2 className="section-title">Object Card Preview</h2>
        <PropertyCard key={uuidv4()} property={property} currentGallery={gallery}/>

    </div>
}

export default ObjectPreview