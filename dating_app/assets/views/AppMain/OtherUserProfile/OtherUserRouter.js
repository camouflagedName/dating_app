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


    return (
        <>
            {
                <Profile
                    setMainPage={props.setPage} 
                    isMine={false}
                    selUserData={props.selUserData} />
            }
        </>
    )
}