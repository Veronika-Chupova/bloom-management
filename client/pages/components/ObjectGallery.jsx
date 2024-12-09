import { useDispatch, useSelector } from "react-redux"
import { useRouter } from "next/router"
import { useState, useEffect } from "react"
import {v4 as uuidv4} from "uuid"
import { addToGallery, removeFromGallery, addToTemp } from "../../store/actions"
import GalleryImage from "./GalleryImage"
import InformPopup from "./InformPopup"
import plusSign from "../../public/assets/plus-sign.png"

function ObjectGallery ({ property, gallery }) {
    const popupDataObject = {
        title: null,
        message: null,
        type: null
    }
    const MAX_FILE_SIZE = 1 * 1024 * 1024  //20MB file size limit
    const dispatch = useDispatch ()
    const path = useRouter().pathname
    const currentGallery = (path === "/new-property") ? useSelector (state => state.temporaryGallery) : gallery
    const galleryIsFull = currentGallery?.length <12 ? false : true
    const [popupIsOpen, setPopupOpen] = useState (false)
    const [popupInfo, setPopupInfo] = useState (popupDataObject)


    function handleUploading (event) {
        const rejectedFiles = []
        const fileList = [...event.target.files]
        const approvedFiles = fileList.filter(item => {
            if (item.size > MAX_FILE_SIZE) {
                rejectedFiles.push(item.name)
            } else {
                return item
            }
        })
        const limit = 12 - currentGallery.length

        if (rejectedFiles.length > 0) {
            popupDataObject.title = "File Uploading Error"
            popupDataObject.message = `The following files will NOT be uploaded due to exceeding the size limit: ${rejectedFiles.join(", ")}`
            popupDataObject.type = "error"
            setPopupInfo (popupDataObject)
            setPopupOpen (true)
        }

        function uploadFiles (files) {
            files.forEach(element => {
                if (element) { 
                    if (path === "/new-property") {
                        const reader = new FileReader
                        reader.onloadend = () => {
                            const file = {
                                imageID: uuidv4(),
                                originalFile: element,
                                file: reader.result
                            }
                            addToTemp (dispatch, file)
                        }
                        reader.readAsDataURL (element)
                    } else {
                        const data = {
                            objectID: property?.objectID,
                            file: element
                        }
                        addToGallery (dispatch, data)
                    }
                }
            })  
            return
        }

        if (approvedFiles.length > limit) {
            uploadFiles (approvedFiles.slice(0,limit))
            popupDataObject.title = "File Uploading Error"
            popupDataObject.message = "The limit of 12 images for a property object is exceeded"
            popupDataObject.type = "error"
            setPopupInfo (popupDataObject)
            setPopupOpen (true)
        } else {
            uploadFiles (approvedFiles)
        }
        return
    }
    
    function handleImgDeletion (fileName) {
        if (path === "/new-property") {
            setTempGallery (prev => prev.filter( item => item.imageID != fileName))
        } else {
            const data = {
                objectID: property?.objectID,
                fileName: fileName
            }
            removeFromGallery (dispatch, data)
        }
    }

    return <div className="object-section">
        <h2 className="section-title">Object Gallery</h2>
        <div className="gallery-container">  
            {currentGallery?.map (({imageID, file}) => <GalleryImage 
                                                    key = {imageID}
                                                    imageName = {imageID}
                                                    imageSrc = {file} 
                                                    handleImgDeletion = {handleImgDeletion}
                                                />
            )}     
            <label className="gallery-img-container" hidden={galleryIsFull}>
                <input id="file-uploader" onChange={handleUploading} multiple={true} type="file" accept="image/png, image/jpeg"/>
                <div className="upload-btn-img-container">
                    <img src={plusSign.src} className="upload-btn-img"/>
                </div>
            </label>  
        </div>
        <InformPopup isOpen={popupIsOpen} setOpen={setPopupOpen} info={popupInfo}/>
    </div>
}

export default ObjectGallery



