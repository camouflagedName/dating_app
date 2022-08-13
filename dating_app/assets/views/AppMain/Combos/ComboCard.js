import React from "react"

export const ComboCard = (props) => {
    return (
        <div className="card">
            <h3 className="card-header">{props.title}</h3>
            <div>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item">An item</li>
                    <li className="list-group-item">A second item</li>
                    <li className="list-group-item">A third item</li>
                </ul>
            </div>
        </div>
    )
}