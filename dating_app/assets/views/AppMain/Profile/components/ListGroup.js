import React from "react"
import { CustomRow } from "./Row"

//accepts an array with an object title:dataEntry pair

export const CustomListGroup = (props) => {
    //const data = props.userData
    console.log(props.entry)

    const rowEntry = props.entry.map((entry) =>
        <li className="list-group-item border border-1 py-4">
            <CustomRow title={entry.title} entry={entry.data} />
        </li>
    )

    return (
            <ul className="list-group">
                {rowEntry}
            </ul>
    )
}