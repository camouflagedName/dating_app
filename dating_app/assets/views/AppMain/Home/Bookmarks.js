import React, { useEffect, useState } from "react"
import { Profile } from "../Profile/ProfileMain"

export const Bookmarks = ({ userID, setPage }) => {
    const [bookmarks, setBookmarks] = useState()

    const getThisUserData = async () => {
        try {
            const response = await fetch(`get_interactive_data/${userID}`)

            if (response.ok) {
                const returnData = await response.json()

                const elArray = await Promise.all(returnData.bookmarks.map(async el => {
                    const bookmarkEl = await fetch(`get_image_path/${el}`)
                        .then(res => {
                            if (res.ok) return res.json()
                        })
                        .then(retData => {
                            const handleClick = () => {
                                setPage(<Profile setPage={setPage} selUserData={{username: el, picture: retData.img_path}} isMine={false} />)
                            }

                            return (
                                <button type='button' className="btn btn-outline-secondary border border-2 border-secondary text-white text-start py-3 my-2 d-flex flex-row" onClick={handleClick}>
                                    <div className="col-2">
                                        <img src={retData.img_path} className="img-thumbnail img-fluid" />
                                    </div>
                                    <div className="col d-flex justify-content-center m-auto">
                                        <span className="fs-1">{el}</span>
                                    </div>
                                </button>
                            )
                        })
                        .catch(err => console.log(err))
                    return bookmarkEl
                }))
                setBookmarks(elArray)
            }
        }
        catch (error) {
            console.log(error)
        }
    }


    useEffect(() => {
        getThisUserData()
    }, [])
    console.log(bookmarks)
    return (
        <div className="container d-flex flex-column mt-5">
            {bookmarks}
        </div>
    )

}


