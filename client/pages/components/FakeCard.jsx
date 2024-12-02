import {v4 as uuidv4} from "uuid"
import Link from "next/link"
import ImageFrame from "./ImageFrame"
import Actions from "./Actions"
import CardInfo from "./CardInfo"

export default function FakeCard () {  

    return <>
    <div className="card">
        <div className="card-img-frame animated-bg"></div>
        <div className="card-info-container">
            <div className="card-info">
                <div className="big-textholder animated-bg"></div>
                <div className="small-textholder animated-bg"></div>
                <div className="small-textholder animated-bg"></div>
                <div className="small-textholder animated-bg"></div>
                <div className="small-textholder animated-bg"></div>
                <div className="big-textholder animated-bg"></div>
            </div>
        </div>
    </div>
    </>
}