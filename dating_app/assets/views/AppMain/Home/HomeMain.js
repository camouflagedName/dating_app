import React from "react"
import PicCarousel from "./PicCarousel"

export const Home = (props) => {


    return (
            <PicCarousel userID={props.userID} setPage={props.setPage} />
    )
}