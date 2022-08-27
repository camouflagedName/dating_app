import React from "react"
import { CustomButton } from "./components/Button"

export const LockScreen = (props) => {

    const handleClick = () => {
        props.changePage("solve")
    }

    return (
        <>
            <div className="col text-center mt-5">
                <svg xmlns="http://www.w3.org/2000/svg" width="160" height="160" fill="currentColor" className="bi bi-lock-fill" viewBox="0 0 16 16">
                    <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z" />
                </svg>

            </div>
            <CustomButton label="Complete COMBO to Unlock" handleClick={handleClick} colorProp='secondary'/>
        </>
    )
}