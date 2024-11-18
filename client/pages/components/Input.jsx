function Input ({ label, name, value, type, handleInput, readOnly }) {
    return <span className="prop-input-container">
        <label>{label}</label>
        <input name={name} value={value} type={type} onChange={handleInput} readOnly={readOnly}/>
    </span>
}

export default Input