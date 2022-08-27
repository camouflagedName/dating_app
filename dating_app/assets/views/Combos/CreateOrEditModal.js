import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";

export const CreateOrEditModal = ({ setReturn }) => {
    const [count, setCount] = useState(5)

//setMainPage(<ComboMainDirectory isMine setPage={setMainPage}/>)

    useEffect(() => {
        const modalTimeout = setTimeout(() => setReturn(prev => !prev) , 5000)

        return () => {clearTimeout(modalTimeout)}
    }, [])

    useEffect(() => {
        const modalInterval = setInterval(() => {
            setCount(prev => --prev)
        }, 1000)

        return () => {clearInterval(modalInterval)}
    }, [])

    return (
        <Modal show={true} backdrop="static" keyboard={false} centered>
            <Modal.Header>
                <Modal.Title>Success</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="col text-center" ><i className="bi bi-check text-success" style={{'fontSize': '100px'}}></i></div>
                <div className="col text-center fs-3" >You successfully setup your combo!</div>
            </Modal.Body>
            <Modal.Footer>
            <div className="col text-center fs-5">Returning to previous page.</div><span className="badge rounded-pill bg-primary fs-5">{count}</span>
            </Modal.Footer>
        </Modal >
    )
}