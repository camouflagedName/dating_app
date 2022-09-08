import React, { useEffect, useState } from "react"
import PicCarousel from "./PicCarousel"
import { Bookmarks } from "./Bookmarks"

const inactive = {
    main: {
        button: '',
        text: 'text-muted'
    },
    bookmarks: {
        button: '',
        text: 'text-muted'
    }
}
export const Home = (props) => {
    const [buttonState, setButtonState] = useState({
        main: {
            button: 'border border-white',
            text: 'text-white'
        },
        bookmarks: {
            button: '',
            text: 'text-muted'
        }
    })

    const [active, setActive] = useState('main')

    const handleClick = (evt) => {
        const button = evt.currentTarget.id
        setButtonState(inactive)
        setActive(button)
    }

    useEffect(() => {
        console.log(active)
        setButtonState(prev => {
            return {
                ...prev, [active]: {
                    button: 'border border-white',
                    text: 'text-white'
                }
            }
        })
    }, [active])

    return (
        <div style={{ marginTop: "125px" }}>
            <div className="row">
                <div className="col d-flex justify-content-center border-end border-2 border-white">
                    <button id="main" type="button" className={`px-5 btn btn-transparent ${buttonState.main.button}`} onClick={handleClick}><span className={`fs-1 ${buttonState.main.text}`}>Main</span></button>
                </div>
                <div className="col d-flex justify-content-center">
                    <button id="bookmarks" type="button" className={`px-5 btn btn-transparent ${buttonState.bookmarks.button}`} onClick={handleClick}><span className={`fs-1 ${buttonState.bookmarks.text}`}>Bookmarks</span></button>
                </div>
            </div>
            {
                active === 'main' ?
                    <PicCarousel userID={props.userID} setPage={props.setPage} />
                    :
                    <Bookmarks userID={props.userID} setPage={props.setPage} />
            }

        </div>

    )
}