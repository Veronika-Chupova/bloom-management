

function CardInfo ({ propertyData }) {
    const {
        propertyType = undefined,
        students = undefined,
        families = undefined,
        children = undefined, 
        pets = undefined, 
        shared = undefined, 
        parking = undefined,
        bills = undefined
    } = propertyData || {}
    const suitText = []
    const nonSuitText = []

    return <div className="card-info">
        <div className="price-block">
            <h3>{ 
                (propertyData?.pricePPPW && "£" + propertyData?.pricePPPW + "pppw") || 
                (propertyData?.pricePCM && "£" + propertyData?.pricePCM + "pcm") 
                }
            </h3>
            <p>{ propertyData?.pricePPPW && propertyData?.pricePCM ? ("£" + propertyData?.pricePCM + "pcm") : null }</p>
        </div>
        <div className="facility-block">
            <p>{propertyData?.bedrooms}
                <span> Bedroom </span>
                <span>{propertyType ?? ""}</span>
                <span>{shared ? ", Shared" : ""}</span>
            </p>
            <p>{propertyData?.furnishing}</p>
            <p>Suitable for
                <span>{ students && " Students" }</span>
                <span>{ families && " Families" }</span>
                <span>{ children && " Children" }</span>
                <span>{ pets && " Pets" }</span>
            </p>
            <p>Not suitable for
                <span>{ students === false && " Students" }</span>
                <span>{ families === false && " Families" }</span>
                <span>{ children === false && " Children" }</span>
                <span>{ pets === false && " Pets" }</span>
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