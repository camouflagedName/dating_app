import React, { useState, useEffect, useContext } from "react";
import { ComboMain } from "./ComboMain";
import Choice from "./CreateComboChoice";
import { GlobalData } from "../../utils/GlobalData";

export const ComboMainDirectory = ({ solve, comboData, setMainPage, setPage }) => {
    const [showCreator, setShowCreator] = useState(false)
    const [useDefault, setUseDefault] = useState()
    const [isComplete, setIsComplete] = useState(false)
    const [updateComboData, setUpdateComboData] = useState(null)

    const userData = useContext(GlobalData)

    const getData = async () => {
         try {
            const response = await fetch(`get_user_combo/${userData.private.id}`)

            if (response.ok) {
                const responseData = await response.json()

                if (response.message) {
                    console.log(responseData)
                }

                else {
                    setIsComplete(true)
                    setUpdateComboData(responseData)
                }
            }
         }

         catch (error) {
            console.log(error)
         }
    }

    //replace with fetch
    useEffect(() => {
        getData()
        
    }, [])

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
                        : showCreator ?  <ComboMain default={useDefault} edit={isComplete} setMainPage={setMainPage} setReturn={setShowCreator} comboData={updateComboData} />
                            : <Choice handleClick={handleClick} isComplete={isComplete} />
                }
            </div>
        </>
    )
}