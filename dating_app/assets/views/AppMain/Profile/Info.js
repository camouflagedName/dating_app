import React from "react"

export const Info = () => {

    return (
        <>
            <ul className="list-group list-group-flush">
                <li className="list-group-item border border-1 py-4">
                    <h5>Name:</h5>
                </li>
                <li className="list-group-item border border-1 py-4">
                    <h5>Age:</h5>
                </li>
                <li className="list-group-item border border-1 py-4">
                    <h5>Location</h5>
                </li>
                <li className="list-group-item border border-1 py-4">
                    <h5>Gender</h5>
                </li>
                <li className="list-group-item border border-1 py-4">
                    <h5>Description</h5>
                </li>
            </ul>
            <div className="row mt-4">
                <div className="d-flex col justify-content-center">
                    <button type="button" className="btn btn-primary">Edit Info</button>
                </div>
            </div>
        </>
    )
}