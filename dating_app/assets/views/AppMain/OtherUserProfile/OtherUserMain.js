import React, {useState, useEffect} from "react";
import { Profile } from "../Profile/ProfileMain";

const OtherUserMain = (props) => {
    const [isLocked, setIsLocked] = useState(true)
    const [pageState, setPageState] = useState()

    //each user will have an array of combos they solved or users they've unlocked
        //retrieve from props

    useEffect(() => {
        //if viewed user is in array of combos
        //setIsLocked(false)
    })



    //if isLocked setPage to 

    //if combo.solved, everything will be unlocked
        //user profile
        //ability to message
    //else, view photo/location

    return (
        <Profile isMine={false} isLocked={isLocked} />
    )
}