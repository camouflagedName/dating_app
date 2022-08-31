import React, { useContext, useEffect, useState } from "react"
import { CustomRow } from "./components/Row"
import { CustomButton } from "./components/Button"

import { GlobalData } from "../../../utils/GlobalData"

export const Facts = ({ changePage, isMine, username }) => {
    const [data, setData] = useState({})
    const userData = useContext(GlobalData)

    const handleClick = () => {
        changePage("combo")
    }

    const getData = async () => {
        const user = isMine ?  userData.tier2.username : username
        try {
            const response = await fetch(`get_user_facts/${user}`)
            
            if (response.ok) {
                const returnDataArray = await response.json()
                
                for (const entry in returnDataArray[0]) {
                    setData(prev => {
                        return {...prev, [entry]: returnDataArray[0][entry]}
                    })
                }
            }
        }

        catch (error) {
            console.log("Error with getData in Facts", error)
        }
    }

    useEffect(() => {
        getData()
    }, [])

    return (
        <>
            <ul className="list-group">
                <li className="list-group-item border border-1 py-4">
                    <CustomRow title={"Likes"} entry={data.num_likes} readOnly />
                </li>
                <li className="list-group-item border border-1 py-4">
                    <CustomRow title={"Match"} entry={data.num_matches} readOnly />
                </li>
                <li className="list-group-item border border-1 py-4">
                    <CustomRow title={"Completed Combos"} entry={data.num_attempted_combos} readOnly />
                </li>
            </ul>
            {
                !isMine ||
                <CustomButton label="Create/Edit Combo" handleClick={handleClick} />
            }

        </>
    )
}