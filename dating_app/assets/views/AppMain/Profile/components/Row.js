import React, { useState } from "react";
import { propTypes } from "react-bootstrap/esm/Image";

export const CustomRow = ({ title, entry, readOnly, setValue, option }) => {

    return (
        <h5 className="row">
            <span className="col text-start">{title}</span>
            
            {
                readOnly ?
                    <span className="col text-end">{entry}</span>
                    :
                    <InputType option={option} title={title} entry={entry} setValue={setValue} />
            }

        </h5>
    )
}

const InputType = ({ option, title, entry, setValue }) => {
    const [inputVal, setInputVal] = useState(entry)

    const handleChange = (evt) => {
        setInputVal(evt.target.value)
        setValue(evt.target.id, evt.target.value)
    }

    return (
        <>
            {
                option ?
                    <Option title={title} setValue={setValue} />
                    :
                    <input id={title} className="col text-center py-1 mx-5" type="text" value={inputVal} onChange={handleChange}></input>

            }
        </>
    )
}

const Option = ({ title, setValue }) => {
    const handleChange = (evt) => {
        //console.log(evt.target.value, evt.target.id)
        setValue(evt.target.id, evt.target.value)
    }

    return (
        <select id={title} className="form-select col text-center py-1 mx-4" aria-label="select gender" onChange={handleChange}>
            <option selected>Choose</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Transgender">Transgender</option>
            <option value="Non-binary/Non-conforming">Non-binary/Non-conforming</option>
            <option value="Other">Other</option>
        </select>
    )
}