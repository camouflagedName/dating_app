import React, { createContext, useEffect, useState } from "react"
import TitleBar from "./components/TitleBar"
import PicCarousel from "./Home/PicCarousel"
import NavBar from "./components/NavBar"

import { Home } from "./Home/HomeMain"
import { Profile } from "./Profile/ProfileMain"
import { Combos } from "./Combos/ComboMain"
import { GlobalData } from "../../utils/GlobalData"

const AppMain = (props) => {
    const [page, setPage] = useState()
    const [tier2Data, setTier2Data] = useState({
        username:'',
        location: '',
        age: null,
        interests: '',
    })
    const [tier1Data, setTier1Data] = useState({
        likedUsers: [],
        matches: [],
        picture: null,
    })

    const [privateData, setPrivateData] = useState({
        id: null,
        email: '',
        comboData: null,
        bookmarks: [],
        ignoredUsers: []
    })

    const handleClick = (target) => {

        switch (target) {
            case "home": setPage(<Home userID={privateData.id} setPage={setPage} />)
                break
            case "profile": setPage(<Profile tier2Data={tier2Data} comoboData={privateData.comboData} setMainPage={setPage} isMine={true} />)
                break
            case "combos": setPage(<Combos setPage={setPage} />)
                break
        }
    }

    //fetch user data on load
    useEffect(() => {
        const id = props.id
        const fetchUserData = async (id) => {
            try {
                const getUserData = await fetch(`get_user/${id}`)

                if (getUserData.ok) {
                    const receivedUserData = await getUserData.json()
                    setTier2Data({
                        username: receivedUserData[2].username,
                        location: receivedUserData[2].location,
                        age: receivedUserData[2].age,
                        about: receivedUserData[2].about,
                        interests: receivedUserData[2].interests,
                    })
                      
                    setTier1Data({
                        likedUsers: receivedUserData[1].liked_user_id,
                        matches: receivedUserData[1].matched_user_id,
                        picture: receivedUserData[1].profile_pic
                    })

                    setPrivateData({
                        id: receivedUserData[0].id,
                        email: receivedUserData[0].email,
                        comboData: receivedUserData[0].combo_data,
                        bookmarks: receivedUserData[0].bookmarks,
                        ignoredUsers: receivedUserData[0].ignored_users,
                    })
                }
            }
            catch (error) {
                console.log(error)
            }
        }

        fetchUserData(id)
        if (privateData.id !== null) {setPage(<Home userID={privateData.id} setPage={setPage} />)}
        

    }, [privateData.id])

    return (
        <div className="container-fluid d-flex flex-column vh-100 bg-dark">
            <div className="row fixed-top" id="titleBar">
                <TitleBar />
            </div>
            <div className="row bg-dark" id="mainContent">
                <GlobalData.Provider value={{private: privateData, tier1: tier1Data, tier2: tier2Data}}>
                    {page}
                </GlobalData.Provider>
            </div>
            <div className="row fs-4 bg-light fixed-bottom">
                <NavBar handleClick={handleClick} />
            </div>
        </div>
    )
}

export default AppMain