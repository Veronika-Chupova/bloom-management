import {v4 as uuidv4} from "uuid"
import Link from "next/link"
import ImageFrame from "./ImageFrame"
import Actions from "./Actions"
import CardInfo from "./CardInfo"
import placeholderImg from "../../public/assets/living-room-placeholder.jpg"

export default function PropertyCard ({ property, currentGallery }) {  //picture update delay, jumping layout when scroling on half covered first card, sinchronise dots and image update
    const propertyData = property?.objectData
    const gallery = currentGallery?.length > 0 ? 
        currentGallery.map( item => item.file ) : 
        [placeholderImg.src]


    return <>
    <div className="card">
        <ImageFrame key={uuidv4()} gallery={gallery}/>
        <div className="card-info-container">
            <Link href={`/property/${property?.objectID}`}>
                <CardInfo key={uuidv4()} propertyData={propertyData}/>
             </Link>
             <Actions key={uuidv4()} objectID={property?.objectID} />
        </div>
    </div>
    </>
}


//update image for better performance https://youtu.be/ZKG8JBdgSos?si=ARCZx3xsLVlWRjds