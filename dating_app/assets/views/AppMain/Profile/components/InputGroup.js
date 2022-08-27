import React from "react"

export const CustomInputGroup = ({input, handleChange}) => {

    return (
        <>
            <input
                id="subject"
                className="form-control fs-4 border border-3"
                type="text"
                placeholder="Subject"
                val={input.subject}
                onChange={handleChange}>
            </input>
            <textarea
                id="content"
                className="form-control fs-4 border border-3"
                aria-label="With textarea"
                rows="8" 
                val={input.content}
                onChange={handleChange}>
            </textarea>
        </>
    )
}