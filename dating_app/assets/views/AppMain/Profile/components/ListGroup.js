import React, { useState } from "react"
import { CustomRow } from "./Row"
import Collapse from 'react-bootstrap/Collapse'

//accepts an array with an object title:dataEntry pair

export const CustomListGroup = ({ entry, isMine, selectedUser, interactive }) => {
    const [collapse, setCollapse] = useState({})
    let sent = null

    const handleClick = (evt) => {
        const isCollapsed = collapse[evt.currentTarget.id] ? collapse[evt.currentTarget.id] : false
        //console.log(isCollapsed)
        setCollapse({[evt.currentTarget.id]: !isCollapsed })
    }

    const receivedEntry = entry.received.map((entry) =>
        <button id={`received-${entry.message_id}`}type="button" className="btn btn-transparent border border-0" onClick={handleClick}>
            <li key={entry.message_id} className="list-group-item border border-1 py-1">
                <CustomRow title={entry.sender} entry={entry.subject} readOnly />
                <Collapse in={collapse[`received-${entry.message_id}`] ? collapse[`received-${entry.message_id}`]:false}>
                    <span className="fs-5 text-muted">{entry.content}</span>
                </Collapse>
            </li>
        </button>
    )
    if (isMine) sent = entry.sent
    else sent = entry.sent.filter(messageData => messageData.receiver === selectedUser)

    const sentEntry = sent.map((entry) =>
        <button id={`sent-${entry.message_id}`} type="button" className="btn btn-transparent border border-0" onClick={handleClick}>
            <li key={entry.message_id} className="list-group-item border border-1 py-1">
                <CustomRow title={entry.receiver} entry={entry.subject} readOnly />
                <Collapse in={collapse[`sent-${entry.message_id}`] ? collapse[`sent-${entry.message_id}`]:false}>
                    <span className="fs-5 text-muted">{entry.content}</span>
                </Collapse>
            </li>
        </button>
    )

    //console.log(collapse)
    return (
        <>
            {
                isMine ?
                    <>
                        {
                            entry.received.length > 0 ?
                                <OwnerMailbox title={`${entry.received.length} Received Messages`} row={receivedEntry} defaultState={false} interactive={interactive} />
                                :
                                <BlankMessage text="-- &nbsp;&nbsp; 0 messages received &nbsp;&nbsp; --" />
                        }
                        {
                            entry.sent.length > 0 ?
                                <OwnerMailbox title={`${entry.sent.length} Sent Messages`} row={sentEntry} defaultState={false} interactive={interactive} />
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

const OwnerMailbox = ({ defaultState, row, title, interactive }) => {
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
        <div className="row my-2 border border-3 m-3 p-2">
            <button id="received" className="btn btn-outline-light col text-dark" type="button" onClick={handleClick}>
                <h3 className="text-center">
                    <i className={`bi bi-chevron-double-${icon} mx-5`}></i>
                    <span>{title}</span>
                </h3>

            </button>
            <Collapse in={collapse}>
                <div className="card px-0">
                    <ul className="list-group">
                        {row}
                    </ul>
                </div>
            </Collapse>
        </div>
    )
}

const SelectedUserMailbox = ({ entry }) => {

    return (
        <div className="row m-2">
            <div className="card px-0">
                <ul className="list-group">
                    {entry}
                </ul>
            </div>
        </div>
    )
}