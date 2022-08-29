/** 
 * 
 * If combo.solved, everything will be unlocked
 * user profile
 * ability to message
 * Else, only view photo and profile facts
 * 
**/


import React, { useState, useEffect, useContext } from "react";
import { Profile } from "../Profile/ProfileMain";

import { GlobalData } from "../../../utils/GlobalData";

export const OtherUserRouter = (props) => {
    const [isLocked, setIsLocked] = useState(true)
    const [unlockLevel, setUnlockLevel] = useState(0)
    const userData = useContext(GlobalData)
    const [receivedComboData, setReceivedComboData] = useState({})
    const [tier2Data, setTier2Data] = useState()
    const [tier1Data, setTier1Data] = useState()

    const setLevel = async (url) => {
        const username = props.comboData ? props.comboData.username : props.selectedUsername
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

                const dataURL = `get_selected_user_data/${username}/${lvl}`
                getData(dataURL, lvl)
            }
        }

        catch (error) {
            console.log(error)
        }
    }

    const getData = async (url, lvl) => {
        try {
            const fetchJson = await fetch(url)

            if (fetchJson.ok) {
                const receivedUserData = await fetchJson.json()

                setReceivedComboData({ comboData: receivedUserData[0].combo_data })
                if (lvl > 0) {
                    setTier1Data({
                        likedUsers: receivedUserData[1].liked_user_id,
                        matches: receivedUserData[1].matched_user_id,
                    })
                }
                if (lvl > 1) {
                    setTier2Data({
                        username: receivedUserData[2].username,
                        location: receivedUserData[2].location,
                        age: receivedUserData[2].age,
                        about: receivedUserData[2].about,
                        interests: receivedUserData[2].interests,
                        gender: receivedUserData[2].gender
                    })
                }

                setUnlockLevel(lvl)
            }
        }

        catch (error) {
            console.log(error)
        }
    }

    //initialize
    useEffect(() => {
        const url = `get_completed_combos/${userData.private.id}`
        setLevel(url)
    }, [])


    return (
        <>
            {
                <Profile
                    comboData={receivedComboData.comboData}
                    tier1Data={tier1Data} tier2Data={tier2Data}
                    setMainPage={props.setPage} isMine={false}
                    isLocked={isLocked} level={unlockLevel}
                    selUserData={props.selUserData} />
            }
        </>
    )
}