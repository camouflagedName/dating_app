import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";

export const ConfirmModal = (props) => {

    //setMainPage(<ComboMainDirectory isMine setPage={setMainPage}/>)

    const handleclick = evt => {
        if (evt.target.id === 'cancel') props.setReturn()
        else {
            props.submit()
            props.setReturn()
        }
    }

    return (
        <Modal show={true} centered>
            <Modal.Header>
                <Modal.Title>Profile photo preview</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="d-flex justify-content-center bg-dark">
                    {props.children}
                </div>
            </Modal.Body>
            <Modal.Footer>
                <div className="row">
                    <div className="col">
                        <button id="cancel" className="btn btn-danger" onClick={handleclick}>Cancel</button>
                    </div>
                    <div className="col">
                        <button id="accept" className="btn btn-primary" onClick={handleclick}>Save</button>
                    </div>
                </div>
            </Modal.Footer>
        </Modal >
    )
}