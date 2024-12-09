import { useState, useEffect } from "react"
import phone1 from "../../public/assets/phone1.png"
import phone2 from "../../public/assets/calling.png"
import phone3 from "../../public/assets/phone3.png"
import chat1 from "../../public/assets/chat1.png"
import chat2 from "../../public/assets/chat2.png"
import chat3 from "../../public/assets/chat3.png"
import chat4 from "../../public/assets/chat4.png"
import chat5 from "../../public/assets/chat.png"
import chat6 from "../../public/assets/writing.png"


function Actions ({ objectID, propertyData }) {
    const [liked, setLiked] = useState()
    const likeImg = liked ? "/assets/like-filled.png" : "/assets/like-empty.png"

    useEffect (() => {
        const currentStorage = localStorage.getItem("liked")

        if (currentStorage) {
            try {
                const parsedStorage = JSON.parse(currentStorage)
                if ( Array.isArray(parsedStorage) && parsedStorage.every( item => typeof item === "number") ) {
                    parsedStorage.some( item => item === objectID ) && setLiked( true )
                } else {
                    localStorage.setItem( "liked", JSON.stringify( [] ) )
                    throw new Error ("Invalid data in local storage")
                }
            } catch (error) {
                console.error("Error retrieving likes:", error.message)
                return []
            }
        }
    }, [])

    useEffect (() => {
            const currentStorage = localStorage.getItem("liked")

            if (!currentStorage) {
                console.warn("No saved objects were found")
                liked && localStorage.setItem( "liked", JSON.stringify( [objectID] ) )
            } else {
                try {
                    const parsedStorage = JSON.parse(currentStorage)
                    if ( Array.isArray(parsedStorage) && parsedStorage.every( item => typeof item === "number") ) {
                        const newStorage = liked
                            ? parsedStorage.concat( [objectID] )
                            : parsedStorage.filter ( item => item !== objectID )
                        localStorage.setItem( "liked",JSON.stringify(newStorage) )
                    } else {
                        localStorage.removeItem ("liked")
                        localStorage.setItem( "liked", JSON.stringify( [objectID] ) )
                        throw new Error ("Invalid data in local storage")
                    }
                } catch (error) {
                    console.error("Error retrieving likes:", error.message)
                    return []
                }
            }
    },[liked])

    function actionClick (event) {
        const name = event.target.name
        const contactString = propertyData.address + " " + propertyData.postcode
        
        switch (name) {
            case "like": 
                setLiked(prev => !prev)
                break
            case "mail":    {/*Change the email address*/}
                window.location.href=`mailto:veroika.chupova@gmail.com?subject=Property%20${contactString}&body=Hello%20Bloomproperties,%0AI%20would%20like%20to%20rent%20this%20property!`
                break
            case "call":    {/*Change the phone*/}
                window.location.href="tel:+441695372111"
                break
            case "message": {/*Change the phone*/}
                window.open(`https://wa.me/447445956693?text=Hello,%20I%20am%20interested%20in%20Property%20${contactString}`)
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
        <button onClick={actionClick} className="action-btn" name="mail">
            <img
                className="mail"
                src="/assets/mail.png"
                alt="mail img"
            />
        </button>
        <button onClick={actionClick} className="action-btn" name="call">
            <img
                className="call"
                // src="/assets/phone-call.png"
                src={phone2.src}
                alt="phone img"
            />
        </button>
        <button onClick={actionClick} className="action-btn" name="message">
            <img
                className="sdcsdc"
                // src="/assets/messenger.png"
                src={chat6.src}
                alt="message img"
            />
        </button>
    </div>
}

export default Actions