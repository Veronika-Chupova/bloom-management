import {v4 as uuidv4} from "uuid"
import Option from "./Option"

function Selector ({optionSet, label, name, value, handleInput, readOnly}) {
    return <span className="prop-input-container">
        <label>{label}</label>
        <select name={name} value={value} onChange={handleInput} disabled={readOnly}>
            <option value="" disabled></option>
            {optionSet?.map( option => <Option 
                                        key = {uuidv4()} 
                                        option={option}
                                    />
            )}
        </select>
    </span>
}

export default Selector