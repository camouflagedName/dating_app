import React, { useState } from "react";
import sendData from "../../../utils/sendData";

const Form = (props) => {

    const [input, setInput] = useState({ username: '', password: '' })

    const handleChange = (event) => {
        setInput({ ...input, [event.target.id]: event.target.value })
    }

    const handleSubmit = async (event) => {
        event.preventDefault()

        const userData = {
            username: input.username,
            password: input.password
        }

        try {
            const returnData = await sendData(userData, props.page)

            if (returnData.ok) {
                props.login(true)
            }
        }
        catch (error) {
            console.log(error)
        }
    }

    return (
        <form method="post" onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="usernameInput" className="form-label">Username</label>
                <input type="text" className="form-control" id="username" aria-describedby="usernameHelp" onChange={handleChange} />
                <div id="usernameHelp" className="form-text">Enter in your username.</div>
            </div>
            <div className="mb-1">
                <label htmlFor="passwordInput" className="form-label">Password</label>
                <input type="password" className="form-control" id="password" onChange={handleChange} />
            </div>
            <div className="mb-3 form-check">
                <input type="checkbox" className="form-check-input" id="showPasswordCheck" />
                <label className="form-check-label" htmlFor="showPasswordCheck">Show password</label>
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    )
}

export default Form