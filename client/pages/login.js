import { useState } from "react"
import { useRouter } from "next/router"
import { login } from "../store/actions.js"
import key from "../public/assets/authentication.png"
import logo from "../public/assets/menu-logo.png"

export default function Login () {
    const router = useRouter()
    const [creds, setCreds] = useState({
        username: "",
        password: ""
    })

    function handleInput (e) {
        const {name, value} = e.target || {}
        setCreds( prev => {
            return {...prev, [name]: value}
        })
    }

    async function handleSubmission (e) {
        e.preventDefault()
        const result = await login(creds)
        if (result) {
            result?.redirect && router.push(result.redirect)
        } else {
            router.push("/property-management")
        }
    }

    return <div className="login-page">
        <div className="header-menu">
            <img src={logo.src}/>
            <h1 className="login-title">Bloom Proprerties Management</h1>
        </div>
        <img src={key.src}/>
        <form>
            <div className="login-input-container">
                <label>Username</label>
                <input name="username" value={creds.username} type="email" onChange={handleInput}/>
            </div>
            <div className="login-input-container">
                <label>Password</label>
                <input name="password" value={creds.password} type="password" onChange={handleInput}/>
            </div>
            <button className="login-btn" type="submit" onClick={handleSubmission}><p>LOGIN</p></button>
        </form>
        {/* <a href="" className="forgot-password">Forgot password?</a> */}
    </div>
}