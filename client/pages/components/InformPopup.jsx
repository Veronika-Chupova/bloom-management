import { useState, useEffect } from "react"
import ReactDOM from "react-dom"
import {v4 as uuidv4} from "uuid"

export default function InformPopup ({ isOpen, setOpen, info }) {
    const { title, message, type } = info || {}
    const btnStyle = type === "error" ? {"backgroundColor": "red"} : {"backgroundColor": "green"}

    if (!isOpen) return null

    return ReactDOM.createPortal(
    <div className="inform-popup">
        <div className="popup-container">
            <div className="popup-section">
                <h3>{title}</h3>
            </div>
            <div className="popup-section">
                <p>{message}</p>
            </div>
            <button className="popup-btn" style={btnStyle} onClick={() => setOpen(false)}>OK</button>
        </div>
    </div>
    , document.body)
}