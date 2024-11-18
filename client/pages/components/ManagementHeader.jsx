import menuLogo from "../../public/assets/menu-logo.png"

function ManagementHeader () {
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
        </div>
    </div>
    </div>
}

export default ManagementHeader