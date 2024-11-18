import { useState } from "react"
import {v4 as uuidv4} from "uuid"
import Dot from "./Dot"

function GalleryControl ({ current, changePic, picNumber }) {
    const galleryLength = picNumber     //Check if exist and positive number
    const dots = [...Array(galleryLength).keys()].map(item => uuidv4())
    const [activeDot, setActiveDot] = useState (current)  //Check how it behave when loading new cards, operating on another card, moving to the card page and back

    function scrollGallery (event) {
        event.preventDefault()
        const name = event.target.name

        if (name==="right") {
            changePic (prev => {
                const newPicIndx = prev + 1 === picNumber ? 0 : prev +1
                return newPicIndx
            })
            setActiveDot(prev => {
                const newActive = activeDot===galleryLength-1 ? 0 : prev + 1
                document.getElementById(`dot${dots[prev]}`)?.classList.remove('active')
                document.getElementById(`dot${dots[newActive]}`)?.classList.add('active')
                return newActive
            })
        } else if (name==="left") {
            changePic (prev => {
                const newPicIndx = prev - 1 < 0 ? picNumber - 1 : prev - 1
                return newPicIndx
            })
            setActiveDot(prev => {
                const newActive = activeDot===0 ? galleryLength-1 : prev - 1
                document.getElementById(`dot${dots[prev]}`)?.classList.remove('active')
                document.getElementById(`dot${dots[newActive]}`)?.classList.add('active')
                return newActive
            })
        }

    }

    return <div>
    <div className="gallery-control">
        <button onClick={scrollGallery} className="gallery-btn" name="left">
            <img                        //Make it through mapping
                className="gallery-arrow-img left"
                src="/assets/gallery-arrow.png"
            />
        </button>
        <button onClick={scrollGallery} className="gallery-btn" name="right">
            <img                        
                className="gallery-arrow-img right"
                src="/assets/gallery-arrow.png"
            />
        </button>
        
    </div>                          
    <div className="gallery-dots">
        {dots.map((item, index) => {
            const dotClass = index===activeDot ? "dot active" : "dot"
            return <Dot key={uuidv4()} dotClass={dotClass} item={item}/>
            })}          
    </div>
    </div>
}

export default GalleryControl