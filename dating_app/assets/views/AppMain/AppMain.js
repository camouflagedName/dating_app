import React, { useEffect, useState } from "react"
import TitleBar from "./components/TitleBar"
import PicCarousel from "./Home/PicCarousel"
import NavBar from "./components/NavBar"

import { Home } from "./Home/Home"
import { Profile } from "./Profile/Profile"

const AppMain = () => {
    const [page, setPage] = useState(<Home />)

    const handleClick = (target) => {

        switch (target) {
            case "home": setPage(<Home />)
                break
            case "profile": setPage(<Profile />) 
                break
            case "combos": break
        }

    }


    return (
        <div className="container-fluid d-flex flex-column vh-100">
            <div className="row" id="titleBar">
                <TitleBar />
            </div>
            <div className="row my-auto" id="picCarousel">
                {page}
            </div>
            <div className="row">
                <NavBar handleClick={handleClick} />
            </div>
        </div>
    )
}

export default AppMain