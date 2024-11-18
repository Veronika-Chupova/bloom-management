import menuLogo from "../../public/assets/menu-logo.png"
import phonePic from "../../public/assets/phone-call.png"

function Header () {
    return <div className="header">
    <div className="header-full">
        <div className="header-content">
            <div className="header-menu">
                <a href="https://bloomproperties.co.uk/">
                    <img className="header-logo" src={menuLogo.src}/>
                </a>
                <nav>
                    <ul className="menu-list">
                        <li><a className="menu-item" href="https://bloomproperties.co.uk/" target="_self">Home</a></li>
                        <li><a className="menu-item" href="https://bloomproperties.co.uk/about/" target="_self">About</a></li>
                        <li><a className="menu-item" href="https://bloomproperties.co.uk/landlords/" target="_self">Landlords</a></li>
                        <li><a className="menu-item" href="https://bloomproperties.co.uk/tenants/" target="_self">Tenants</a></li>
                        <li><a className="menu-item" href="https://bloomproperties.co.uk/property-maintenance/" target="_self">Property Maintenance</a></li>
                        <li><a className="menu-item" href="http://localhost:3000/" target="_self">Property Listing</a></li>     {/*Change address*/}
                    </ul>
                </nav>
            </div>
            <div className="header-contact">
                <a href="tel:01695372111">
                    <div className="call-btn">
                        <span className="call-btn-items">
                            {/* <img className="call-btn-img" src={phonePic.src}/> */}
                            <svg 
                                xmlns="http://www.w3.org/2000/svg" 
                                viewBox="0 0 12.21 18.99"
                                height="24px" 
                                width="12px"
                            >
                                <g>
                                    <path 
                                        className="cls-2" 
                                        d="m10.18,0H2.04C.91,0,0,.91,0,2.04v14.92c0,1.12.91,2.04,2.04,2.04h8.14c1.12,0,2.04-.91,2.04-2.04V2.04c0-1.12-.91-2.04-2.04-2.04ZM1.36,4.07h9.5v10.85H1.36V4.07Zm.68-2.71h8.14c.37,0,.68.3.68.68v.68H1.36v-.68c0-.37.3-.68.68-.68Zm8.14,16.28H2.04c-.37,0-.68-.3-.68-.68v-.68h9.5v.68c0,.37-.3.68-.68.68Z"
                                    />
                                </g>
                            </svg>		
                            <span className="call-btn-txt">01695 372 111</span>
                        </span>
                    </div>
                </a>
                <a href="https://bloomproperties.co.uk/contact-us/">
                    <div className="contact-btn">
                        <span>Get in Touch</span>
                        <span>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="#000000" height="12px" width="17px" viewBox="0 0 18.41 11.13">
                                <g>
                                    <g>
                                        <line className="cls-1" y1="5.56" x2="17" y2="5.56"></line>
                                        <path className="cls-1" d="M12.14 0.71s4.81 4.81 4.86 4.86c-0.05 0.05-4.86 4.86-4.86 4.86"></path>
                                    </g>
                                </g>
                            </svg>
                        </span>
                    </div>
                </a>
            </div>
        </div>
    </div>
    <div className="header-small">
        <div className="header-small-content">
            <div>
                <a href="https://bloomproperties.co.uk/">
                    <img className="header-logo" src={menuLogo.src}/>
                </a>  
            </div>
            <div>
                <a href="">
			        <svg 
                        aria-hidden="true" 
                        viewBox="0 0 448 512" 
                        xmlns="http://www.w3.org/2000/svg"
                        height="40px">
                        <path className="cls-3" d="M16 132h416c8.837 0 16-7.163 16-16V76c0-8.837-7.163-16-16-16H16C7.163 60 0 67.163 0 76v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16z"></path>
                    </svg>			
                </a>
            </div>
        </div>
    </div>
    </div>
}

export default Header