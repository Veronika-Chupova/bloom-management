import bin from "../../public/assets/bin.png"

function GalleryImage ({imageName, imageSrc, handleImgDeletion}) {
    return <div className="gallery-img-container">
        <img src={imageSrc} className="uploaded-img" tabIndex="0"/>
        <button className="gallery-img-delete-btn" onClick={()=>handleImgDeletion(imageName)}>
            <img src={bin.src}/>
        </button>
    </div>
}

export default GalleryImage