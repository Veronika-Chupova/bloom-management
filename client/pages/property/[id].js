import { useRouter } from "next/router"

export default function Property () {
    const router = useRouter()
    const { id } = router.query
    return <h1>The detailed info about Property {id} will be displayed here</h1>
}