import React, { useState } from "react";

export const CustomRow = ({ title, entry, readOnly, setValue, option, button, showModal, isNumber }) => {

    return (
        <h5 className="row">
            <span className="col text-start">{title}</span>

            {
                readOnly ?
                    <span className="col text-end">{entry}</span>
                    :
                    <InputType title={title} entry={entry} setValue={setValue} type={{ option, button }} showModal={showModal} isNumber={isNumber} />
            }

        </h5>
    )
}

const InputType = ({ type, title, entry, setValue, showModal, isNumber }) => {

    return (
        <>
            {
                type.option ?
                    <Option title={title} setValue={setValue} />
                    : type.button
                        ? <Button title={title} entry={entry} showModal={showModal} />
                        : <Input title={title} inputVal={entry} setInputVal={setValue} isNumber={isNumber} />
            }
        </>
    )
}

const Option = ({ title, setValue }) => {
    const handleChange = (evt) => {
        setValue(evt.target.id, evt.target.value)
    }

    return (
        <select id={title} defaultValue={"default"} className="form-select col text-center py-1 mx-4" aria-label="select gender" onChange={handleChange}>
            <option value="default" disabled>Choose an option</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Transgender">Transgender</option>
            <option value="Non-binary/Non-conforming">Non-binary/Non-conforming</option>
            <option value="Other">Other</option>
            <option value="Prefer not to answer">Prefer not to answer</option>
        </select>
    )
}

const Button = ({ title, entry, showModal }) => {

    const handleClick = () => {
        showModal(true)
    }

    return (
        <button id={title} className="col btn btn-transparent border border-1 border-secondary text-center py-1 mx-5 text-center" type="button" onClick={handleClick}>{entry}</button>
    )
}


const Input = ({ isNumber, title, inputVal, setInputVal }) => {
    const [value, setValue] = useState(inputVal || undefined)
    const [error, setError] = useState(null)
    const handleChange = (evt) => {
        setError(null)
        if (isNumber) {
            const converToNumber = Number(evt.target.value)
            if (isNaN(converToNumber)) setError("Please enter a number")
            //else if (evt.target.id < 10)
            else {
                setValue(converToNumber)
                setInputVal(evt.target.id, converToNumber)
            }
        }
        else {
            setValue(evt.target.value)
            setInputVal(evt.target.id, evt.target.value)
        }
    }

    return (
        <>
            <input id={title} className="col text-center py-1 mx-5" type="text" value={value} onChange={handleChange}></input>
            {error && <span className="text-danger">{error}</span>}
        </>

    )
}