import React, { useState } from "react"
import { CustomRow } from "./Row"
import Collapse from 'react-bootstrap/Collapse'

//accepts an array with an object title:dataEntry pair

export const CustomListGroup = ({ entry, isMine, selectedUser }) => {
    let sent = null

    const receivedEntry = entry.received.map((entry) =>
        <li key={entry.message_id} className="list-group-item border border-1 py-1">
            <CustomRow title={entry.sender} entry={entry.subject} readOnly />
        </li>
    )
    if (isMine) sent = entry.sent
    else sent = entry.sent.filter(messageData => messageData.receiver === selectedUser)

    const sentEntry = sent.map((entry) =>
        <li key={entry.message_id} className="list-group-item border border-1 py-1">
            <CustomRow title={entry.receiver} entry={entry.subject} readOnly />
        </li>
    )

    return (
        <>
            {
                isMine ?
                    <>
                        {
                            entry.received.length > 0 ?
                                <OwnerMailbox title={`${entry.received.length} Received Messages`} row={receivedEntry} defaultState={false} />
                                :
                                <BlankMessage text="-- &nbsp;&nbsp; 0 messages received &nbsp;&nbsp; --" />
                        }
                        {
                            entry.sent.length > 0 ?
                                <OwnerMailbox title={`${entry.sent.length} Sent Messages`} row={sentEntry} defaultState={false} />
                                :
                                <BlankMessage text="-- &nbsp;&nbsp;No sent messages yet&nbsp;&nbsp; --" />
                        }
                    </>

                    :
                    <>
                        {
                            entry.sent.length > 0 ?
                                <SelectedUserMailbox entry={sentEntry} />
                                :
                                <BlankMessage text="-- &nbsp;&nbsp;No messages yet&nbsp;&nbsp; --" />
                        }
                    </>

            }

        </>
    )
}

const BlankMessage = ({ text }) => {

    return (
        <div className="row my-2 border border-3 m-3 py-2">
            <span className="text-center fs-3">{text}</span>
        </div>
    )
}

const OwnerMailbox = ({ defaultState, row, title }) => {
    const [collapse, setCollapse] = useState(defaultState)
    const [icon, setIcon] = useState("up")

    const handleClick = evt => {
        const key = evt.currentTarget.id
        setCollapse(!collapse)
        setIcon(prev => {
            prev = prev === "down" ? 'up' : 'down' 
            return prev
        })
    }

    return (
        <div className="row my-2 border border-3 m-3 py-2">
            <button id="received" className="btn btn-outline-light col text-dark" type="button" onClick={handleClick}>
                <h3 className="text-center">
                    <i className={`bi bi-chevron-double-${icon} mx-5`}></i>
                    <span>{title}</span>
                </h3>
                <Collapse in={collapse}>
                    <div className="card px-0">
                        <ul className="list-group">
                            {row}
                        </ul>
                    </div>
                </Collapse>
            </button>
        </div>
    )
}

const SelectedUserMailbox = ({ entry }) => {

    return (
        <div className="row my-2">
            <div className="card px-0">
                <ul className="list-group">
                    {entry}
                </ul>
            </div>
        </div>
    )
}