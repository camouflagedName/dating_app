import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";

import { OtherUserRouter } from "../AppMain/OtherUserProfile/OtherUserRouter";

export const CustomModal = ({ numberCorrect, comboData, setPage }) => {
    const [statement, setStatement] = useState(null)

    useEffect(() => {
        if (numberCorrect <= 1) setStatement("did not unlock")
        else if (numberCorrect < 4) setStatement("unlocked some of")
        else setStatement("unlocked all of")
    }, [numberCorrect])

    const handleClick = () => {
        setPage(<OtherUserRouter setPage={setPage} comboData={comboData} selUserData={comboData.username}/>)
    }

    return (
        <Modal show={true} backdrop="static" keyboard={false} centered>
            <Modal.Header closeButton>
                <Modal.Title>Results</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                You answered {numberCorrect} out of 5 questions correctly. You {statement} {comboData.username}'s profile.
            </Modal.Body>
            <Modal.Footer>
                <button type="button" className="btn btn-success" onClick={handleClick}>Continue</button>
            </Modal.Footer>
        </Modal >
    )
}