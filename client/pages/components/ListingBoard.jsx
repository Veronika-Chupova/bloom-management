import { v4 as uuidv4 } from 'uuid'
import PropertyCard from "./PropertyCard"
import FakeCard from "./FakeCard"

export default function ListingBoard ({ objectItems, objectHolders }) {
    console.log(objectItems, objectHolders)
    
    return <div className="main-board">
        {objectItems?.length > 0
            ? objectItems?.map( property => <PropertyCard key={uuidv4()} property={property} currentGallery={property?.gallery} />)
            : objectHolders?.map (item => <FakeCard key={uuidv4()} />)
        }
    </div>
}

