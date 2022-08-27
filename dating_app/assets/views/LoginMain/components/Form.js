import React, { useState } from "react";
import sendData from "../../../utils/sendData";

const Form = (props) => {
    const [passwordFormat, setPasswordFormat] = useState("password")
    const [input, setInput] = useState()

    const handleInputChange = (event) => {
        setInput({ ...input, [event.target.id]: event.target.value })
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        
        const userData = {
            username: input.username,
            password: input.password
        }
        props.page === 'register' ? userData.email = input.email : null

        try {
            const returnData = await sendData(userData, `${props.page}`)

            if (returnData.ok) {
                const userData = await returnData.json()
                props.login({ activated: true, id: userData.user_id })
            }

            else {
                throw "Invalid login."     
            }
        }
        catch (error) {
            console.log(error)
        }
    }

    const handleCheckboxChange = (event) => {
        if (event.target.checked) {
            setPasswordFormat("text")
        }
        else {
            setPasswordFormat("password")
        }
    }

    return (
        <form method="post" onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="usernameInput" className="form-label">Username</label>
                <input type="text" className="form-control" id="username" aria-describedby="usernameHelp" onChange={handleInputChange} />
                <div id="usernameHelp" className="form-text">Enter in your username.</div>
            </div>
            {
                props.page === "register" ?
                    <div className="mb-3">
                        <label htmlFor="emailInput" className="form-label">Email</label>
                        <input type="text" className="form-control" id="email" aria-describedby="emailHelp" onChange={handleInputChange} />
                        <div id="emailHelp" className="form-text">Enter in your email.</div>
                    </div>
                    :
                    <></>
            }
            <div className="mb-1">
                <label htmlFor="passwordInput" className="form-label">Password</label>
                <input type={passwordFormat} className="form-control" id="password" onChange={handleInputChange} />
            </div>
            <div className="mb-3 form-check">
                <input type="checkbox" className="form-check-input" id="showPasswordCheck" onChange={handleCheckboxChange} />
                <label className="form-check-label" htmlFor="showPasswordCheck">Show password</label>
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    )
}

export default Form