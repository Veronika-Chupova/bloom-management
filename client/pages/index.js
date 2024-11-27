import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import Header from "./components/Header"
import Footer from "./components/Footer"
import TitleSection from "./components/TitleSection"
import PropertyBoard from "./components/PropertyBoard"
import getData, { getFullData } from "../store/actions"

function Index () {
    const dispatch = useDispatch()
    const objectItems = useSelector (state => state.items)
    const [renderReady, setRenderReady] = useState(false)
    useEffect (() => {
        getFullData(dispatch, "Active")
    }, [])          // stops working after several turns back
    useEffect (() => {        
        if (objectItems) {
            setRenderReady(true)
        }
    }, [objectItems])

    return  <>
    {renderReady && <>
        <Header />
        <TitleSection />
        <PropertyBoard objectItems={objectItems}/>
        <Footer />
        <div> Icons made by <a href="https://www.flaticon.com/authors/smashicons" title="Smashicons"> Smashicons </a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com'</a></div>
        <a href="https://www.flaticon.com/free-icons/dot" title="dot icons">Dot icons created by Bharat Icons - Flaticon</a>
        <div> Icons made by <a href="https://www.freepik.com" title="Freepik"> Freepik </a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com'</a></div>
        <div> Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik"> Freepik </a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com'</a></div>
        <div> Icons made by <a href="https://www.freepik.com" title="Freepik"> Freepik </a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com'</a></div>
        <div> Icons made by <a href="https://www.freepik.com" title="Freepik"> Freepik </a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com'</a></div>
        <div> Icons made by <a href="https://www.freepik.com" title="Freepik"> Freepik </a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com'</a></div>
        <div> Icons made by <a href="https://www.flaticon.com/authors/cursor-creative" title="Cursor Creative"> Cursor Creative </a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com'</a></div>
        <div> Icons made by <a href="https://www.freepik.com" title="Freepik"> Freepik </a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com'</a></div>
        <div> Icons made by <a href="https://www.freepik.com" title="Freepik"> Freepik </a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com'</a></div>
        <div> Icons made by <a href="https://www.flaticon.com/authors/icon-small" title="icon_small"> icon_small </a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com'</a></div>
        <div> Icons made by <a href="https://www.freepik.com" title="Freepik"> Freepik </a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com'</a></div>
        <div> Icons made by <a href="https://www.freepik.com" title="Freepik"> Freepik </a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com'</a></div>
        <div> Icons made by <a href="https://www.flaticon.com/authors/prosymbols-premium" title="Prosymbols Premium"> Prosymbols Premium </a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com'</a></div>
    </>}
    </>
}

export default Index