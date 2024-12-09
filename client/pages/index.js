import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import Header from "./components/Header"
import Footer from "./components/Footer"
import TitleSection from "./components/TitleSection"
import ListingBoard from "./components/ListingBoard"
import getData, { getFullData } from "../store/actions"
import ManagementFooter from "./components/ManagementFooter"

function Index () {
    const dispatch = useDispatch()
    const objectItems = useSelector (state => state.items)
    const [renderReady, setRenderReady] = useState(false)
    const [propHolder, setPropHolder] = useState ([])

    useEffect (() => {
        async function fetchData () {
            const propNumber = await getFullData(dispatch, "Active")
            setPropHolder([...Array.from({length: propNumber})])
        }
        fetchData()     
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
        <ListingBoard objectItems={objectItems} objectHolders={propHolder}/>
        <ManagementFooter />
        {/* <Footer />
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
        <div> Icons made by <a href="" title="Dwi ridwanto"> Dwi ridwanto </a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com'</a></div>
        <div> Icons made by <a href="https://www.flaticon.com/authors/sumberrejeki" title="SumberRejeki"> SumberRejeki </a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com'</a></div>
        <div> Icons made by <a href="https://www.flaticon.com/authors/pixel-perfect" title="Pixel perfect"> Pixel perfect </a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com'</a></div>
        <div> Icons made by <a href="https://www.freepik.com" title="Freepik"> Freepik </a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com'</a></div>
        <div> Icons made by <a href="https://www.flaticon.com/authors/smashicons" title="Smashicons"> Smashicons </a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com'</a></div>
        <div> Icons made by <a href="https://www.flaticon.com/authors/apien" title="apien"> apien </a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com'</a></div>
        <div> Icons made by <a href="https://www.flaticon.com/authors/gregor-cresnar" title="Gregor Cresnar"> Gregor Cresnar </a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com'</a></div>
        <div> Icons made by <a href="https://www.flaticon.com/authors/meaicon" title="meaicon"> meaicon </a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com'</a></div>
        <div> Icons made by <a href="" title="Gregor Cresnar"> Gregor Cresnar </a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com'</a></div>
        
        <div> Icons made by <a href="https://www.flaticon.com/authors/pixel-perfect" title="Pixel perfect"> Pixel perfect </a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com'</a></div>
        <div> Icons made by <a href="https://www.freepik.com" title="Freepik"> Freepik </a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com'</a></div>
        <div> Icons made by <a href="https://www.freepik.com" title="Freepik"> Freepik </a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com'</a></div>
         */}
    </>}
    </>
}

export default Index