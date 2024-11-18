function BackBtn ({onClick}) {
    return <div className="management-btn" onClick={onClick}>
            <span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="#6B36B7" height="15px" width="30px" viewBox="0 0 18.41 11.13">
                    <g>
                        <g>
                            <line className="cls-4" x1="17" x2="0" y1="5.56" y2="5.56"></line>
                            <path className="cls-4" d="M4.86 0.71s-4.81 4.81-4.86 4.86c0.05 0.05 4.86 4.86 4.86 4.86"></path>
                        </g>
                    </g>
                </svg>
            </span>
            <h3>Back</h3>
        </div> 
}

export default BackBtn