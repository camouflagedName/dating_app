import React from "react"
export const Facts = () => {

    return (
        <>
            <ul className="list-group list-group-flush">
                <li className="list-group-item border border-1 py-4">
                    <h5>Likes:</h5>
                </li>
                <li className="list-group-item border border-1 py-4">
                    <h5>Completed Combos:</h5>
                </li>
                <li className="list-group-item border border-1 py-4">
                    <h5>???</h5>
                </li>
            </ul>
            <div className="row mt-4">
                <div className="d-flex col justify-content-center">
                    <button type="button" className="btn btn-primary">Create/Edit Combo</button>
                </div>
                <div className="d-flex col justify-content-center">
                    <button type="button" className="btn btn-primary">Read Messages</button>
                </div>
            </div>
        </>
    )
}