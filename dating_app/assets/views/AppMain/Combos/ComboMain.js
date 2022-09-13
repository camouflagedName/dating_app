import React, { useContext, useEffect, useState } from "react"
import { ComboCard } from "./ComboCard"
import { ComboCarousel } from "./ComboCarousel"
import { GlobalData } from "../../../utils/GlobalData"
import Spinner from 'react-bootstrap/Spinner';

export const Combos = ({ setPage }) => {
    const [comboInstanceData, setComboInstanceData] = useState([])
    const [imageLoaded, setImageLoaded] = useState(false)
    const [dataCheck, setDataCheck] = useState(false)

    const userData = useContext(GlobalData)

    const getData = async () => {
        const URL = `get_completed_combos/${userData.private.id}`

        try {
            const response = await fetch(URL)

            if (response.ok) {
                const dataArray = await response.json()
                setComboInstanceData(dataArray)
                setDataCheck(true)
            }
        }

        catch (error) {
            console.log(error)
        }
    }

    const imageCheck = (bool) => {
        setImageLoaded(bool)
    }

    useEffect(() => {
        getData()
    }, [])

    useEffect(() => {

    })

    return (
        <div className="container d-flex flex-column vh-100" style={{ marginTop: "125px", marginBottom: "250px" }}>
            {
                dataCheck ?
                <>
                    {
                        comboInstanceData.length > 0 ?
                            <>

                                <ComboCarousel entryData={comboInstanceData} setPage={setPage} isLoaded={imageCheck} />

                                {
                                    imageLoaded &&
                                    <div className="m-5">
                                        <ComboCard entryData={comboInstanceData} />
                                    </div>

                                }

                            </>
                            :
                            <h1 className="text-center text-white m-auto">Compelete COMBOS and see your results here</h1>
                    }
                </>
                :
                <div className="fs-3 text-center m-auto">
                    <Spinner animation="border" variant="light" />
                </div>
            }
        </div>
    )
}