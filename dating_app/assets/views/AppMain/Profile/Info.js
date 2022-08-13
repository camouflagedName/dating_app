import React from "react"
import { CustomRow } from "./components/Row"

export const Info = (props) => {
    const data = props.userData

    return (
        <>
            <ul className="list-group">
                <li className="list-group-item border border-1 py-4">
                    <CustomRow title={"Name"} entry={data.username} />
                </li>
                <li className="list-group-item border border-1 py-4">
                    <CustomRow title={"Age"} entry={data.age} />
                </li>
                <li className="list-group-item border border-1 py-4">
                    <CustomRow title={"Location"} entry={data.location} />
                </li>
                <li className="list-group-item border border-1 py-4">
                    <CustomRow title={"Gender"} entry={null} />
                </li>
                <li className="list-group-item border border-1 py-4">
                    <CustomRow title={"Myself"} entry={data.description} />
                </li>
            </ul>
            <div className="row mt-4">
                <div className="d-flex col justify-content-center">
                    <button type="button" className="btn btn-primary fs-4">Edit Info</button>
                </div>
            </div>
        </>
    )
}