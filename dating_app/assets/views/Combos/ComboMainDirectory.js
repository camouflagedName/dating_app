import React, { useState, useEffect, useContext } from "react";
import { ComboMain } from "./ComboMain";
import Choice from "./CreateComboChoice";
import { GlobalData } from "../../utils/GlobalData";
import { propTypes } from "react-bootstrap/esm/Image";

export const ComboMainDirectory = ({ solve, comboData, setMainPage, setPage }) => {
    const [showCreator, setShowCreator] = useState(false)
    const [useDefault, setUseDefault] = useState()
    const [isComplete, setIsComplete] = useState(false)

    const userData = useContext(GlobalData)

    //replace with fetch
    useEffect(() => {
        if (userData.private.comboData.length) {
            setIsComplete(true)
        }
    })

    const handleClick = (event) => {
        setShowCreator(!showCreator)
        if (event.target.id === "default") {
            setUseDefault(true)
        }

        else {
            setUseDefault(false)
        }

    }


    return (
        <>
            <div className="container">
                {
                    solve ? <ComboMain default={false} edit={false} comboData={comboData} setPage={setMainPage} solve />
                        : showCreator ?  <ComboMain default={useDefault} edit={isComplete} setMainPage={setMainPage} setReturn={setShowCreator} />
                            : <Choice handleClick={handleClick} isComplete={isComplete} />
                }
            </div>
        </>
    )
}