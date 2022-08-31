import React, { useContext, useEffect, useState } from "react"
import { ComboCard } from "./ComboCard"
import { ComboCarousel } from "./ComboCarousel"
import { GlobalData } from "../../../utils/GlobalData"

export const Combos = ({setPage}) => {
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
        <div className="container" style={{ marginTop: "125px", marginBottom: "100px" }}>
            {
                comboInstanceData.length > 0 ?
                    <>
                        <div>
                            <ComboCarousel entryData={comboInstanceData} setPage={setPage} />
                        </div>
                        <div className="m-5">
                            <ComboCard entryData={comboInstanceData} />
                        </div>
                    </>
                    :
                    <h1 className="text-center text-white">Compelete COMBOS and see your results here</h1>
            }
        </div>
    )
}