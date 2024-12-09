import { useRouter } from "next/router"
import ManagementFooter from "../components/ManagementFooter"
import Header from "../components/Header"
import PropertyBoard from "../components/PropertyBoard"
import TitleSection from "../components/TitleSection"

export default function Property () {
    const router = useRouter()
    const { id } = router.query
    return <>
        <Header />
        <TitleSection />
        <PropertyBoard />
        <ManagementFooter />
    </>
}