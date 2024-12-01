function PropertyActionBtn ({ title, onClick }) {
    return <>
    <div className="management-btn" onClick={onClick}>
        <h3>{title}</h3>
    </div>
</>
}

export default PropertyActionBtn