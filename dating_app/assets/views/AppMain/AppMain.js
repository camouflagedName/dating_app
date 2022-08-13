import React, { useEffect, useState } from "react"
import TitleBar from "./components/TitleBar"
import PicCarousel from "./Home/PicCarousel"
import NavBar from "./components/NavBar"

import { Home } from "./Home/HomeMain"
import { Profile } from "./Profile/ProfileMain"
import { Combos } from "./Combos/ComboMain"

const AppMain = (props) => {
    const [page, setPage] = useState()
    const [userData, setUserData] = useState({
        id: null,
        username:'',
        location: '',
        age: null,
        email: '',
        interests: '',
    })
    const [moreUserData, setMoreUserData] = useState({
        likedUsers: [],
        matches: [],
    })

    const handleClick = (target) => {

        switch (target) {
            case "home": setPage(<Home userID={userData.id} />)
                break
            case "profile": setPage(<Profile userData={userData} otherUserData={moreUserData} setPage={setPage} isMine={true} isLocked={false} />)
                break
            case "combos": setPage(<Combos />)
                break
        }
    }

    //fetch user data on load
    useEffect(() => {

        const fetchData = async () => {
            try {
                const getUserData = await fetch(`get_user/${props.id}`)

                if (getUserData.ok) {
                    const userData = await getUserData.json()
                    setUserData({
                        id: userData[0].id,
                        username: userData[0].username,
                        location: userData[0].location,
                        age: userData[0].age,
                        email: userData[0].email,
                        interests: userData[0].interests,
                    })

                        
                    setMoreUserData({
                        likedUsers: userData[1].liked_user_id,
                        matches: userData[1].matched_user_id,
                    })
                }
            }
            catch (error) {
                console.log(error)
            }
        }

        fetchData()
        if (userData.id !== null) {setPage(<Home userID={userData.id} />)}
        

    }, [userData.id])

    return (
        <div className="container-fluid d-flex flex-column vh-100">
            <div className="row" id="titleBar">
                <TitleBar />
            </div>
            <div className="row my-auto" id="mainContent">
                {page}
            </div>
            <div className="row fs-4">
                <NavBar handleClick={handleClick} />
            </div>
        </div>
    )
}

export default AppMain