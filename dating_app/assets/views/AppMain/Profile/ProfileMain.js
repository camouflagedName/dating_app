import React, { useEffect, useState } from "react"
import Tab from "react-bootstrap/Tab"
import Tabs from "react-bootstrap/Tabs"
import { CreateCombo } from "../../Combos/ComboMain"
import { ComboMainDirectory } from "../../Combos/ComboMainDirectory"
import { Facts } from "./Facts"
import { Info } from "./Info"
import { Messages } from "./Messages"
import { LockScreen } from "./LockScreen"
import { ProfilePic } from "./ProfilePic"

const lockImg =
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-lock-fill" viewBox="0 0 16 16">
        <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z" />
    </svg>




export const Profile = ({ privateData, tier1Data, tier2Data, isMine, isLocked, setMainPage, level, comboData, selUserData }) => {
    const [page, setPage] = useState()
    //const [isLocked, setIsLocked] = useState()

    const title = (titleArg) => {
        return (
            <span>
                {
                    isMine && isLocked ? lockImg : null
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

    for (const dataTitle in tier2Data) {
        const title = capitalizeFirstLetter(dataTitle)
        info.push({ title: title, data: tier2Data[dataTitle] })
    }

    for (const dataTitle in tier1Data) {
        const title = capitalizeFirstLetter(dataTitle)
        facts.push({ title: title, data: tier1Data[dataTitle] })
    }

    const handleClick = (target) => {
        if (!isLocked) {
            if (isMine) {
                switch (target) {
                    case "facts": setPage(<Facts selUserData={tier2Data} changePage={handleClick} isMine />)
                        break
                    case "info": setPage(<Info entryData={tier2Data} privateData={privateData} isMine />)
                        break
                    case "combo": setMainPage(<ComboMainDirectory isMine setMainPage={setMainPage} />)
                        break
                    case "messages": setPage(<Messages locked={isLocked} tier2Data={tier2Data} isMine />)
                        break
                        //default: setPage(<Facts selUserData={tier2Data} changePage={handleClick} isMine />)
                }

            }

            else if (target === 'facts' && level > 0) setPage(<Facts changePage={handleClick} selUserData={selUserData} locked={isLocked} />)
            else if (target === 'info' && level > 1) setPage(<Info entryData={tier2Data} locked={isLocked} />)
            else if (target === 'messages' && level > 2) setPage(<Messages tier2Data={tier2Data}  />)

        }
        else if (target === 'solve') {
            setMainPage(<ComboMainDirectory comboData={comboData[0]} setMainPage={setMainPage} solve />)
        }
    }

    useEffect(() => {
        setPage(isLocked ? <LockScreen changePage={handleClick} /> : tier1Data ? <Facts selUserData={selUserData} changePage={handleClick} isMine={isMine} /> : <></>)
    }, [isLocked, tier1Data, tier2Data, comboData])


    return (

        <div className="card border border-2 shadow shadow-5 col-sm-10 offset-sm-1 col-xl-8 offset-xl-2 p-0" style={{marginTop: "150px", marginBottom: "100px"}}>
            <ProfilePic selUserData={selUserData} isMine={isMine}/>
            <div className="card-body px-0">
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