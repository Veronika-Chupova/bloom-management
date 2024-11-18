import { useDispatch } from "react-redux"
import {v4 as uuidv4} from "uuid"
import { addToGallery, removeFromGallery } from "../../store/actions"
import GalleryImage from "./GalleryImage"
import plusSign from "../../public/assets/plus-sign.png"

function ObjectGallery ({ property, gallery }) {
    const dispatch = useDispatch ()

    function handleUploading (event) {
        const fileList = [...event.target.files]
        fileList.forEach(element => {
            if (element) { 
                const data = {
                    objectID: property?.objectID,
                    file: element
                }
                addToGallery (dispatch, data)
            }
        })  
    }
    
    function handleImgDeletion (fileName) {
        const data = {
            objectID: property?.objectID,
            fileName: fileName
        }
        removeFromGallery (dispatch, data)
    }

    return <div className="object-section">
        <h2 className="section-title">Object Gallery</h2>
        <div className="gallery-container">         
            {gallery?.map (({imageID, file}) => <GalleryImage 
                                                    key = {uuidv4()}
                                                    imageName = {imageID}
                                                    imageSrc = {file} 
                                                    handleImgDeletion = {handleImgDeletion}
                                                />
            )}
            <label className="gallery-img-container">
                <input id="file-uploader" onChange={handleUploading} multiple={true} type="file" accept="image/png, image/jpeg" value=""/>
                <div className="upload-btn-img-container">
                    <img src={plusSign.src} className="upload-btn-img"/>
                </div>
            </label>  
        </div>
    </div>
}

export default ObjectGallery



