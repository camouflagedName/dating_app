import React, { useEffect, useState, useContext } from "react"
import Tab from "react-bootstrap/Tab"
import Tabs from "react-bootstrap/Tabs"
import { CreateCombo } from "../../Combos/ComboMain"
import { ComboMainDirectory } from "../../Combos/ComboMainDirectory"
import { Facts } from "./Facts"
import { Info } from "./Info"
import { Messages } from "./Messages"
import { LockScreen } from "./LockScreen"
import { ProfilePic } from "./ProfilePic"
import { GlobalData } from "../../../utils/GlobalData";

const lockImg =
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-lock-fill" viewBox="0 0 16 16">
        <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z" />
    </svg>

export const Profile = ({ tier1Data, tier2Data, isMine, setMainPage, selUserData }) => {
    const [page, setPage] = useState()
    const [combo, setCombo] = useState(null)
    const [isLocked, setIsLocked] = useState(!isMine)
    const [unlockLevel, setUnlockLevel] = useState()
    const userData = useContext(GlobalData)
    const [tabIsDisabled, setTabIsDisabled] = useState({
        facts: false,
        info: false,
        messages: false
    })

    const username = isMine ? tier2Data.username : selUserData.username

    const setLevel = async () => {
        const url = `get_completed_combos/${userData.private.id}`
        
        try {
            const fetchJson = await fetch(url)

            if (fetchJson.ok) {
                const getInstanceDataArray = await fetchJson.json()
                const getInstanceData = getInstanceDataArray
                    .find(entry => entry.combo_data.creator === username)

                let lvl = 0
                if (getInstanceData) {
                    setIsLocked(false)
                    if (getInstanceData.num_correct <= 1) lvl = 1
                    else if (getInstanceData.num_correct <= 3) lvl = 2
                    else lvl = 3
                }
                setUnlockLevel(lvl)
            }
        }

        catch (error) {
            console.log(error)
        }
    }

    const getComboData = async () => {
        try {
            const fetchJson = await fetch(`get_selected_user_combo/${username}/`)

            if (fetchJson.ok) {
                const receivedUserData = await fetchJson.json()

                setCombo({ comboData: receivedUserData[0].combo_data })
                return receivedUserData[0].combo_data
            }
        }

        catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        setLevel()
    }, [])


    const title = (titleArg, tier) => {
        return (
            <span>
                {
                    !isMine && tier > unlockLevel ? lockImg : null
                }
                {titleArg}
            </span>
        )
    }

    const factsTitle = title("Quick Facts", 1)
    const infoTitle = title("User Info", 2)
    const msgTitle = title("Messages", 3)

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

    const handleClick = async (target) => {
        if (!isLocked) {
            if (isMine) {
                switch (target) {
                    case "facts": setPage(<Facts username={tier2Data.username} changePage={handleClick} isMine />)
                        break
                    case "info": setPage(<Info username={tier2Data.username} isMine />)
                        break
                    case "combo": setMainPage(<ComboMainDirectory isMine setMainPage={setMainPage} />)
                        break
                    case "messages": setPage(<Messages username={tier2Data.username} isMine />)
                        break
                    //default: setPage(<Facts selUserData={tier2Data} changePage={handleClick} isMine />)
                }
            }

            else if (target === 'facts' && unlockLevel > 0) setPage(<Facts changePage={handleClick} username={username} />)
            else if (target === 'info' && unlockLevel > 1) setPage(<Info username={username} />)
            else if (target === 'messages' && unlockLevel > 2) setPage(<Messages username={username} />)

        }
        else if (target === 'solve') {
            const comboData = await getComboData()
            setMainPage(<ComboMainDirectory comboData={comboData[0]} setMainPage={setMainPage} solve />)
        }
    }

    useEffect(() => {

        if (!isMine) {
            if (unlockLevel < 3) {
                setTabIsDisabled({ messages: true, info: false, facts: false })
            }
            if (unlockLevel < 2) {
                setTabIsDisabled({ messages: true, info: true, facts: false })
            }
            if (unlockLevel < 1) {
                setTabIsDisabled({ messages: true, info: true, facts: true })
            }
        }

        setPage(
            isLocked
                ? <LockScreen changePage={handleClick} />
                : <Facts changePage={handleClick} username={username} isMine={isMine} />
        )

    }, [isLocked, tier1Data, unlockLevel])

    return (
        <div className="card border border-2 shadow shadow-5 col-sm-10 offset-sm-1 col-xl-8 offset-xl-2 p-0" style={{ marginTop: "125px", marginBottom: "100px" }}>
            <h1 className="text-center text-muted mt-3">{username}</h1>
            <ProfilePic selUserData={selUserData} isMine={isMine} />
            <div className="card-body px-0">
                <div className="mb-0 fs-3">
                    <Tabs defaultActiveKey="facts" id="tab-page" fill onSelect={handleClick}>
                        <Tab eventKey="facts" title={factsTitle} disabled={tabIsDisabled.facts} />
                        <Tab eventKey="info" title={infoTitle} disabled={tabIsDisabled.info} />
                        <Tab eventKey="messages" title={msgTitle} disabled={tabIsDisabled.messages} />
                    </Tabs>
                </div>
                {page}
            </div>
        </div>
    )
}

//            <img src="..." className="card-img-top" alt="..." />