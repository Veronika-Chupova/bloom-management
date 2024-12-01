import { useRouter } from "next/router"
import { logout } from "../../store/actions"
import menuLogo from "../../public/assets/menu-logo.png"
import logoutIcon from "../../public/assets/logout.png"

export default function ManagementHeader ({ currentUser }) {
    const router = useRouter()

    async function handleLogout () {
        const success = await logout()
        if (success) { router.push({pathname: "/login"}) }
        //popup notification
    }


    return <div className="header">
    <div className="management-header">
        <div className="header-content">
            <div className="header-menu">
                <a href="https://bloomproperties.co.uk/">
                    <div className="logo-container">
                        <img className="header-logo" src={menuLogo.src}/>
                    </div>
                </a>
                <h1>Bloom Properties Management</h1>
            </div>
            <div className="username-container">
                <h3>{currentUser}</h3>
                <button className="logout-btn" onClick={handleLogout}>
                    <img src={logoutIcon.src}/>
                </button>
            </div>
        </div>
    </div>
    </div>
}
