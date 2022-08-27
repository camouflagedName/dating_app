import React, { useEffect } from "react"

export const ComboCard = ({ entryData }) => {



    const listRows = entryData.map(entry => {
        return (
            <li className="list-group-item d-flex fs-5">
                <div className="col">
                    {entry.combo_data.creator}
                </div>
                <div className="col text-center fs-5">
                    {entry.date_solved}
                </div>
                <div className="col text-end fs-5">
                    {entry.num_correct}
                </div>
            </li>
        )
    })

    return (
        <div className="card shadow shadow-5">

            <h3 className="card-header d-flex">
                <div className="col">
                    Username
                </div>
                <div className="col text-center">
                    Date Completed
                </div>
                <div className="col text-end">
                    Correct
                </div>
            </h3>

            <ul className="list-group list-group-flush">
                {
                    !entryData || listRows
                }
            </ul>
        </div>

    )
}