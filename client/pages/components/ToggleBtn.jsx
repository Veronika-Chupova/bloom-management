import { useState } from "react"

function ToggleBtn ({ handleToggleInput, value, title, label, disabled }) {
    const btnStyle = {
        yes: String(value) === String (1) ? " active-btn" : "",
        no: String(value) === String (0) ? " active-btn" : ""
    }
    // const [toggler, setToggler] = useState (btnStyle)

    function handleTogglerClick (event) {
        event.preventDefault ()
        const value = event.target.value
        // setToggler ({...btnStyle, [name]: " active-btn"})
        handleToggleInput(title, value)
    }

    return <span className="prop-input-container">
        <label>{label}</label>
        <div className="btn-group-toggle">
            <button className={"toggle-btn"+btnStyle.yes} onClick={handleTogglerClick} name="yes" value={1} type="button" disabled={disabled}>Yes</button>
            <button className={"toggle-btn"+btnStyle.no} onClick={handleTogglerClick} name="no" value={0} type="button" disabled={disabled}>No</button>
        </div>
    </span>
    
}

export default ToggleBtn