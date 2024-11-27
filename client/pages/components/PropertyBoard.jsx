import { v4 as uuidv4 } from 'uuid'
import PropertyCard from "./PropertyCard"

function PropertyBoard ({ objectItems }) {
    
    return <div className="main-board">
        {objectItems?.map( property => <PropertyCard key={uuidv4()} property={property} currentGallery={property?.gallery} />)}
        {/* <PropertyCard key={uuidv4()}/>
        <PropertyCard key={uuidv4()}/>
        <PropertyCard key={uuidv4()}/> */}
    </div>
}

export default PropertyBoard