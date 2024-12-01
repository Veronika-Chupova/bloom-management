import { useState, useEffect } from "react"
import { useRouter } from "next/router"
import { changePassword } from "../store/actions.js"
import key from "../public/assets/authentication.png"
import logo from "../public/assets/menu-logo.png"

export default function ChangePassword () {
    const router = useRouter()
    const [creds, setCreds] = useState({
        username: "",
        new: "",
        confirmation: ""
    })
    const [rules, setRules] = useState({
        length: false,
        numbers: false,
        letters: false,
        match: false
    })
    const [passwordReady, setPasswordReady] = useState (false)

    useEffect( () => {
        setRules({
                length: creds.new?.length >= 8,
                numbers: /\d/.test(creds.new),
                letters: /[A-Z]/.test(creds.new) && /[a-z]/.test(creds.new),
                match: creds.new === creds.confirmation && creds.new
        })
    }, [creds])
    useEffect ( () => {
        const rulesValidation = Object.values(rules).reduce( (acc, item) => item && acc, true)
        setPasswordReady(rulesValidation)
    }, [rules])

    function handleInput (e) {
        const {name, value} = e.target || {}
        setCreds( prev => {
            return {...prev, [name]: value}
        })
    }

    async function handleSubmission (e) {
        e.preventDefault()
        const data = {
            username: creds.username,
            password: creds.new
        }
        if (passwordReady) {
            const success = await changePassword(data)
            if (success === true) {
                router.push("/login")
            } else {
                //make notification popup
            }
        }
    }

    return <div className="login-page">
        <div className="header-menu">
            <img src={logo.src}/>
            <h1 className="login-title">Bloom Proprerties Management</h1>
        </div>
        <h2>Create New Password</h2>
        <div className="password-rules">
            <p className={rules.length ? "resolved" : null}>No less than 8 symbols</p>
            <p className={rules.numbers ? "resolved" : null}>Contains numbers</p>
            <p className={rules.letters ? "resolved" : null}>Uppercase and lowercase letters</p>
            <p className={rules.match ? "resolved" : null}>Passwords match</p>
        </div>
        <form>
            <div className="login-input-container">
                <label>Username</label>
                <input name="username" value={creds.username} type="email" onChange={handleInput}/>
            </div>
            <div className="login-input-container">
                <label>New Password</label>
                <input name="new" value={creds.new} type="password" onChange={handleInput}/>
            </div>
            <div className="login-input-container">
                <label>Confirm Password</label>
                <input name="confirmation" value={creds.confirmation} type="password" onChange={handleInput}/>
            </div>
            <button 
                className="login-btn" 
                type="submit" 
                onClick={handleSubmission} 
            >
                <p>Change Password</p>
            </button>
        </form>
    </div>
}