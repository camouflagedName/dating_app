import React, { useContext, useEffect, useState } from "react"
import { ComboCard } from "./ComboCard"
import { ComboCarousel } from "./ComboCarousel"
import { GlobalData } from "../../../utils/GlobalData"

export const Combos = ({ setPage }) => {
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
        <div className="container d-flex flex-column vh-100" style={{ marginTop: "125px", marginBottom: "250px" }}>
            {
                comboInstanceData.length > 0 ?
                    <>

                        <ComboCarousel entryData={comboInstanceData} setPage={setPage} />

                        <div className="m-5">
                            <ComboCard entryData={comboInstanceData} />
                        </div>
                    </>
                    :
                    <h1 className="text-center text-white m-auto">Compelete COMBOS and see your results here</h1>
            }
        </div>
    )
}