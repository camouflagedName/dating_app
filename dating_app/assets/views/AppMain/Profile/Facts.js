import React from "react"
import { CustomRow } from "./components/Row"
export const Facts = (props) => {
    const data = props.userData
   
    const handleClick = () => {
        props.changePage("combo")
    }

    return (
        <>
            <ul className="list-group">
                <li className="list-group-item border border-1 py-4">
                    <CustomRow title={"Likes"} entry={data.likedUsers.length} />
                </li>
                <li className="list-group-item border border-1 py-4">
                    <CustomRow title={"Views"} entry={null} />
                </li>
                <li className="list-group-item border border-1 py-4">
                    <CustomRow title={"Completed Combos"} entry={null} />
                </li>
            </ul>
            <div className="row mt-4">
                <div className="d-flex col justify-content-center">
                    <button type="button" className="btn btn-primary fs-4" onClick={handleClick}>Create/Edit Combo</button>
                </div>
            </div>
        </>
    )
}