import React, { useEffect, useState, useContext, useRef } from "react"
import { CustomRow } from "./components/Row"
import { CustomButton } from "./components/Button"
import { InputModal } from "../../../components/InputModal"
import sendData from "../../../utils/sendData"
import { GlobalData } from "../../../utils/GlobalData"

export const Info = ({ username, isMine }) => {
    const userData = useContext(GlobalData)
    const userID = userData.private.id
    const [readOnly, setReadOnly] = useState(true)
    const [buttonLabel, setButtonLabel] = useState("Edit Info")
    const [showModal, setShowModal] = useState(false)

    const inputRef = useRef()

    const [inputVal, setInputVal] = useState({
        "username": "",
        "email": "",
        "age": undefined,
        "location": "",
        "about": "",
        "interests": "",
        "gender": ""
    })
    const [infoGroupElements, setInfoGroupElements] = useState([])

    const getInfoData = async () => {
        const user = isMine ? userData.tier2.username : username
        const URL = `get_user_info/${user}`
        try {
            const response = await fetch(URL)

            if (response.ok) {
                const returnData = await response.json()
                setInputVal(returnData[0])
            }
        }

        catch (error) {
            console.log(error)
        }
    }


    const sendInputVal = async URL => {
        try {
            const send = await sendData(inputVal, URL)
            if (send.ok) {
                const returnData = await send.json()
                setInputVal(returnData[0])
            }
        }

        catch (error) {
            console.log(error)
        }
    }

    //initialize data
    useEffect(() => {
        getInfoData()
    }, [])


    const handleClick = () => {
        if (!readOnly) {
            const URL = `update_user/${userID}`
            sendInputVal(URL)
        }
        setReadOnly(!readOnly)
    }

    //updates button label
    useEffect(() => {
        if (!readOnly) setButtonLabel("Update Profile")
        else setButtonLabel("Edit Info")
    }, [readOnly])



    const handleChange = (rowInputLabel, rowInputValue) => {
        setInputVal(prev => {
            return { ...prev, [rowInputLabel.toLowerCase()]: rowInputValue }
        })
    }

    //prototype to dynamically build/map and render entire group **not active yet**
    useEffect(() => {
        setInfoGroupElements(prev => {
            for (const key in userData.tier2) {

                const element =
                    <li className="list-group-item border border-1 py-4">
                        <CustomRow title={key} entry={userData.tier2[key]} readOnly />
                    </li>
                prev.push(element)

            }
            return prev
        })
    }, [userData])

    return (
        <>
            {inputVal &&
                <>

                {
                    showModal && <InputModal setValue={handleChange} showModal={setShowModal} title="Location"/>
                }

                    <ul id="infoList" className="list-group" ref={inputRef}>
                        <li className="list-group-item border border-1 py-4">
                            <CustomRow title={"Name"} entry={inputVal.username} readOnly />
                        </li>
                        {
                            isMine ?
                                <li className="list-group-item border border-1 py-4">
                                    <CustomRow title={"E-mail"} entry={inputVal.email} readOnly />
                                </li>
                                :
                                <></>
                        }
                        <li className="list-group-item border border-1 py-4">
                            <CustomRow title={"Age"} entry={inputVal.age} readOnly={readOnly} setValue={handleChange} isNumber/>
                        </li>
                        <li className="list-group-item border border-1 py-4">
                            <CustomRow title={"Location"} entry={inputVal.location} readOnly={readOnly} setValue={handleChange} showModal={setShowModal} button />
                        </li>
                        <li className="list-group-item border border-1 py-4">
                            <CustomRow title={"Gender"} entry={inputVal.gender} readOnly={readOnly} setValue={handleChange} option />
                        </li>
                        <li className="list-group-item border border-1 py-4">
                            <CustomRow title={"About"} entry={inputVal.about} readOnly={readOnly} setValue={handleChange} />
                        </li>
                    </ul>

                    {
                        !isMine ||
                        <CustomButton label={buttonLabel} handleClick={handleClick} />
                    }
                </>
            }
        </>
    )
}