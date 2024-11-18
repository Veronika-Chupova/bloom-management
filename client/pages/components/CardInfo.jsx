

function CardInfo ({ propertyData }) {
    const {
        students = undefined,
        families = undefined,
        children = undefined, 
        pets = undefined, 
        shared = undefined, 
        parking = undefined,
        bills = undefined
    } = propertyData || {}

    return <div className="card-info expansive">
        <div className="price-block">
            <h3>£{propertyData?.pricePPPW} pppw</h3>
            <p>£{propertyData?.pricePCM} pcm</p>
        </div>
        <div className="facility-block">
            <p>{propertyData?.bedrooms} Bedrooms
                <span>{Number(shared) ? ", Shared" : ""}</span>
            </p>
            <p>{propertyData?.furnishing}</p>
            <p>Suits for
                <span>{Number(students) ? " Students" : ""}</span>
                <span>{Number(families) ? " Families" : ""}</span>
                <span>{Number(children) ? " Children" : ""}</span>
                <span>{Number(pets) ? " Pets" : ""}</span>
            </p>
            <p>Does NOT suit for
                <span>{!Number(students) && students ? " Students" : ""}</span>
                <span>{!Number(families) && families ? " Families" : ""}</span>
                <span>{!Number(children) && children ? " Children" : ""}</span>
                <span>{!Number(pets) && pets ? " Pets" : ""}</span>
            </p>
        </div>
        <div className="address-block">
            <h4>{propertyData?.address} {propertyData?.postcode}</h4>
        </div>
        <div className="icons-block">
            <span className="icons-group">
                <img src="/assets/bed.png"/>
                <p>{propertyData?.bedrooms}</p>
            </span>
            <span className="icons-group">
                <img src="/assets/shower.png"/>
                <p>{propertyData?.bathrooms}</p> 
            </span>
            {Number(parking) ? 
            <span className="icons-group">
                <img src="/assets/parking.png"/>
            </span> :
            null
            }
        </div>
    </div>
}

export default CardInfo