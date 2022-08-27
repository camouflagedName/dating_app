import React, { useContext, useEffect, useState } from "react"
import { ComboCard } from "./ComboCard"
import { ComboCarousel } from "./ComboCarousel"
import { GlobalData } from "../../../utils/GlobalData"

//on load, fetch combo data


export const Combos = () => {
    const [comboInstanceData, setComboInstanceData] = useState([])

    const userData = useContext(GlobalData)

    const getData = async () => {
        const URL = `get_completed_combos/${userData.private.id}`

        try {
            const response = await fetch(URL)

            if (response.ok) {
                const dataArray = await response.json()
                setComboInstanceData(dataArray)
            }
        }

        catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getData()
    }, [])

    return (
        <div className="container">
            {
                comboInstanceData.length > 0 ?
                    <>
                        <div className="my-5">
                            <ComboCarousel entryData={comboInstanceData} />
                        </div>
                        <div className="my-5">
                            <ComboCard entryData={comboInstanceData} />
                        </div>
                    </>
                    :
                    <h1 className="text-center text-white">Compelete COMBOS and see your results here</h1>
            }
        </div>
    )
}