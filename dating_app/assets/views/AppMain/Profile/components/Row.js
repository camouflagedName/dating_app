import React from "react";

export const CustomRow = (props) => {

    return (
        <h5 className="row">
            <span className="col-9">{props.title}</span>
            <span className="col text-end">{props.entry}</span>
        </h5>
    )
}