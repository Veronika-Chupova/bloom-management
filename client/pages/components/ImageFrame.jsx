import { useState } from "react"
import { v4 as uuidv4 } from "uuid"
import GalleryControl from "./GalleryControl"

export default function ImageFrame ({ gallery }) {
    const [currentPicIndx, setCurrentPicIndx] = useState (0)    //check if images available

    return <div className="card-img-frame">            
        <img 
            className="card-img"
            src={gallery[currentPicIndx]}     //Make it through import
            alt="house image"
        />
        {gallery.length > 1 && <GalleryControl
                                    key={uuidv4()}
                                    current={currentPicIndx} 
                                    changePic={setCurrentPicIndx} 
                                    picNumber={gallery.length} 
                                />}
    </div>
}