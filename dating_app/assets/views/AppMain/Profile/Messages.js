import React, { useContext, useEffect, useState } from "react"

import { CustomListGroup } from "./components/ListGroup"
import { CustomButton } from "./components/Button"
import { CustomInputGroup } from "./components/InputGroup"
import { TimedModal } from "../../../components/TimedModal"

import { GlobalData } from "../../../utils/GlobalData"
import sendData from "../../../utils/sendData"

export const Messages = ({ isMine, tier2Data }) => {
    const [showList, setShowList] = useState(true)
    const [showEmail, setShowEmail] = useState(false)
    const [label, setLabel] = useState("Write a message")
    const [input, setInput] = useState({ subject: '', content: '' })
    const [messages, setMessages] = useState({sent: [], received: []})

    //const entry = [{ title: "Michael", data: "Message Title" }, { title: "Jess", data: "Message Title" }, { title: "Hampton", data: "Message Title" }, { title: "Leila", data: "Message Title" }]
    const selectedUser = tier2Data.username
    const myData = useContext(GlobalData)

    const sendMessageData = async URL => {
        try {
            const returnData = await sendData(input, URL)

            if (returnData.ok) {
                setInput({ subject: '', content: '' })
                setShowList(false)
            }
        }

        catch (error) {
            console.log(error)
        }

    }

// if !isMine, filter by selected username
    const getMessageData = async URL => {
        try {
            const jsonData = await fetch(URL)

            if (jsonData.ok) {
                const returnData = await jsonData.json()
                const messageData = returnData[0]
                setMessages( {sent: messageData.sent_messages, received: messageData.received_messages })
            }
        }

        catch (error) {
            console.log(error)
        }
    }


    //fetch data with conditional
    useEffect(() => {

        if (showEmail) {
            setLabel("Send")
        }

        else {    
            setLabel("Write a message")
        }

    }, [showEmail])

    useEffect(() => {
        if (showList) getMessageData(`get_messages/${myData.private.id}`)
    }, [showList])

    const handleClick = () => {
        setShowEmail(prev => {
            if (prev) {
                if (input.subject === '' || input.content === '') {
                    alert("All fields must be filled in before sending.")
                }
                else sendMessageData(`send_message/${selectedUser}/${myData.private.id}`)
            }

            return !prev
        })

    }

    const handleChange = evt => {
        setInput(prev => { return { ...prev, [evt.target.id]: evt.target.value } })
    }

    const handleModalClose = () => {
        setShowList(true)
    }

    return (
        <>
            {
                showEmail ?
                    <CustomInputGroup input={input} handleChange={handleChange} />
                    :
                    showList ?
                        <CustomListGroup entry={messages} isMine={isMine} selectedUser={selectedUser}/>
                        :
                        <TimedModal message={`Your message was successfully sent.`} setReturn={handleModalClose} />
            }
            {
                isMine ||
                <CustomButton label={label} handleClick={handleClick} />
            }
        </>
    )

}