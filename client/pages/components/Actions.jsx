import {useState} from "react"

function Actions () {
    const [liked, setLiked] = useState(false)
    const likeImg = liked ? "/assets/like-filled.png" : "/assets/like-empty.png"

    function actionClick (event) {
        const name = event.target.name
        
        switch (name) {
            case "like": 
                setLiked(prev => !prev)     //Make connection with DB and cookie
                break
            case "mail":    {/*Change the email address*/}
                window.location.href="mailto:veroika.chupova@gmail.com?subject=PropertyID&body=Hello%20Bloomproperties,%0AI%20would%20like%20to%20rent%20this%20property!"
                break
            case "call":    {/*Change the phone*/}
                window.location.href="tel:+447895441772"
                break
            case "message": {/*Change the phone*/}
                window.open("https://wa.me/447445956693?text=Hello,%20I%20am%20interested%20in%20PropertyID")
                break
        }
    }
    return <div className="action-container">
        <button onClick={actionClick} className="action-btn" name="like">
            <img                        //Make it through mapping, import asset
                className="like"
                src={likeImg}
                alt="heart img"
            />
        </button>
        {/* <a href="mailto:veroika.chupova@gmail.com?subject=PropertyID&body=Hello%20Bloomproperties,%0AI%20would%20like%20to%20rent%20this%20property!">  Change the email address */}
        <button onClick={actionClick} className="action-btn" name="mail">
            <img
                className="mail"
                src="/assets/mail.png"
                alt="mail img"
            />
        </button>
        {/* </a> */}
        {/* <a href="tel:+447895441772"> */}
        <button onClick={actionClick} className="action-btn" name="call">
            <img
                className="call"
                src="/assets/phone-call.png"
                alt="phone img"
            />
        </button>
        {/* </a> */}
        {/* <a href="https://wa.me/447445956693?text=Hello,%20I%20am%20interested%20in%20PropertyID" target="_blank">  Change the email address */}
        <button onClick={actionClick} className="action-btn" name="message">
            <img
                className="sdcsdc"
                src="/assets/messenger.png"
                alt="message img"
            />
        </button>
        {/* </a> */}
    </div>
}

export default Actions