import defaultImg from "../../public/assets/living-room-placeholder.jpg"

export default function PropertyBoard () {
    return <>
    <div className="prop-section">
        <div className="prop-title-img">
            <img src={defaultImg.src}/>
        </div>
        <div className="prop-summary">
            <div className="prop-address">
                <h2>Address</h2>
            </div>
            <div className="prop-price">
                <p>Price</p>
            </div>
            <div className="prop-features">
                features
            </div>
            <div className="prop-section-links">
                Links
            </div>
            <div className="prop-fast-contact">
                <p>Interested?</p>
        <p>Click to contact us <a href={`https://wa.me/447445956693?text=Hello,%20I%20am%20interested%20in%20Property%20`} target="blank">here</a>!</p>
            </div>
        </div>
    </div>
    </>
}