import { useState, useEffect } from "react"
import { authCheck } from "../store/actions.js"
import PropertyPassport from "./components/PropertyPassport"

function NewProperty () {
    const [isReady, setReady] = useState ()

    useEffect(() => {
        async function accessControl () {
            const user = await authCheck ()
            if (user) {
                setReady(true)
            } else {
                setReady(false)
                window.location.href = "/login"
            }
        }
        accessControl()
    }, [])

    return isReady && <PropertyPassport isReadOnly={false} />
}

export default NewProperty