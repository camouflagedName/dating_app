import React, { useEffect, useState } from "react"
import Tab from "react-bootstrap/Tab"
import Tabs from "react-bootstrap/Tabs"
import { CreateCombo } from "../../Combos/CreateCombo"
import { CreateComboMain } from "../../Combos/CreateComboMain"
import { Facts } from "./Facts"
import { Info } from "./Info"
import { Messages } from "./Messages"

const lockImg =
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-lock-fill" viewBox="0 0 16 16">
        <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z" />
    </svg>

const lgLockImg =
    <>
        <div className="col text-center mt-5">
            <svg xmlns="http://www.w3.org/2000/svg" width="160" height="160" fill="currentColor" className="bi bi-lock-fill" viewBox="0 0 16 16">
                <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z" />
            </svg>

        </div>
        <div className="d-flex justify-content-center mt-3">
            <button type="button col-4" className="btn btn-secondary"><h4 className="m-0">Solve to Unlock</h4></button>
        </div>
    </>


export const Profile = (props) => {
    const [page, setPage] = useState()
    const [isLocked, setIsLocked] = useState()

    const title = (titleArg) => {
        return (
            <span>
                {
                    !props.isMine && props.isLocked ? lockImg : null
                }
                {titleArg}
            </span>
        )
    }

    const factsTitle = title("Quick Facts")

    const infoTitle = title("User Info")

    const msgTitle = title("Messages")


    //coerce userdata into 3 arrays: facts, info, messages


    let facts = []
    let info = []
    let msg = []

    //title case function
    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }


    for (const dataTitle in props.userData) {
        const title = capitalizeFirstLetter(dataTitle)
        info.push({ title: title, data: props.userData[dataTitle] })
    }

    for (const dataTitle in props.moreUserData) {
        const title = capitalizeFirstLetter(dataTitle)
        facts.push({ title: title, data: props.moreUserData[dataTitle] })
    }

    console.table(props)

    const handleClick = (target) => {
        if (!props.isLocked) {
            switch (target) {
                case "facts": setPage(<Facts userData={props.moreUserData} changePage={handleClick} locked={props.isLocked} />)
                    break
                case "info": setPage(<Info userData={props.userData} locked={props.isLocked} />)
                    break
                case "combo": props.setPage(<CreateComboMain />)
                    break
                case "messages": setPage(<Messages locked={props.isLocked} />)
                    break
            }
        }
    }

    useEffect(() => {
        setPage(props.isLocked ? lgLockImg : <Facts userData={props.moreUserData} changePage={handleClick} />)

    }, [props.isLocked])


    return (

        <div className="card border border-0 my-5 col-sm-10 offset-sm-1 col-xl-8 offset-xl-2">
            <div className="text-center border border-2 rounded col-6 offset-3 py-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" fill="currentColor" className="bi bi-person-plus-fill" viewBox="0 0 16 16">
                    <path d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                    <path fillRule="evenodd" d="M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5z" />
                </svg>
                <p>Add Image</p>
            </div>
            <div className="card-body">
                <div className="mb-0 fs-3">
                    <Tabs defaultActiveKey="facts" id="tab-page" fill onSelect={handleClick}>
                        <Tab eventKey="facts" title={factsTitle} />
                        <Tab eventKey="info" title={infoTitle} />
                        <Tab eventKey="messages" title={msgTitle} />
                    </Tabs>
                </div>
                {page}
            </div>
        </div>
    )
}

//            <img src="..." className="card-img-top" alt="..." />