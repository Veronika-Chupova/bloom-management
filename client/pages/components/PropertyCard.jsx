import { useState } from "react"
import Image from 'next/image'
import {v4 as uuidv4} from "uuid"
import GalleryControl from "./GalleryControl"
import Actions from "./Actions"
import CardInfo from "./CardInfo"
import placeholderImg from "../../public/assets/living-room-placeholder.jpg"

function PropertyCard ({ property, currentGallery }) {  //picture update delay, jumping layout when scroling on half covered first card, sinchronise dots and image update
    const propertyData = property?.objectData
    // const gallery = Object.keys(currentGallery).length > 0 ? currentGallery : {placeholder: placeholderImg.src}
    const gallery = currentGallery?.length > 0 ? 
        currentGallery.map( item => item.file ) : 
        [placeholderImg.src]
    const [currentPicIndx, setCurrentPicIndx] = useState (0)    //check if images available

    return <>
    <div className="card">
        <div className="card-img-frame">            
            <img 
                className="card-img"
                src={gallery[currentPicIndx]}     //Make it through import
                alt="house image"
            />
            {/* {(Object.entries(gallery).length > 1) && <GalleryControl  */}
            {gallery.length > 1 && <GalleryControl
                                        key={uuidv4()}
                                        current={currentPicIndx} 
                                        changePic={setCurrentPicIndx} 
                                        picNumber={gallery.length} 
                                    />}
        </div>
        <CardInfo key={uuidv4()} propertyData={propertyData}/>
        <Actions key={uuidv4()} />
    </div>
    </>
}

export default PropertyCard

//update image for better performance https://youtu.be/ZKG8JBdgSos?si=ARCZx3xsLVlWRjds