import { v4 as uuidv4 } from 'uuid'
import PropertyCard from "./PropertyCard"

function PropertyBoard () {
    return <div className="main-board">
        <PropertyCard key={uuidv4()}/>
        <PropertyCard key={uuidv4()}/>
        <PropertyCard key={uuidv4()}/>
    </div>
}

export default PropertyBoard