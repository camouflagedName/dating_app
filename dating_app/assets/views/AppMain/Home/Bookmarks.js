import React, { useEffect, useState } from "react"
import { Profile } from "../Profile/ProfileMain"
import sendData from "../../../utils/sendData"

export const Bookmarks = ({ userID, setPage }) => {
    const [bookmarks, setBookmarks] = useState()

    const sendData = async (URL, item) => {
        try {
            const response = await fetch(URL)

            if (response.ok) {
                const resMsg = await response.text()

                setBookmarks(prev => {
                    prev.splice(item, 1)
                    return prev
                })
                getThisUserData()
            }
        }

        catch (error) {
            console.log(error)
        }
    }

    const getThisUserData = async () => {
        try {
            const response = await fetch(`get_interactive_data/${userID}`)

            if (response.ok) {
                const returnData = await response.json()

                const elArray = await Promise.all(returnData.bookmarks.map(async (el, key) => {
                    const bookmarkEl = await fetch(`get_image_path/${el}`)
                        .then(res => {
                            if (res.ok) return res.json()
                        })
                        .then(retData => {
                            const handleClick = () => {
                                setPage(<Profile setPage={setPage} selUserData={{ username: el, picture: retData.img_path }} isMine={false} />)
                            }

                            const handleRemove = evt => {
                                const URL = `update_bookmark/${userID}/${el}`

                                sendData(URL, evt.currentTarget.id)

                            }

                            return (
                                <div className="d-flex border border-2 border-secondary my-2">
                                    <button type='button' className="col btn btn-outline-dark text-white text-start py-3 my-2 d-flex flex-row" onClick={handleClick}>
                                        <div className="col-2">
                                            <img src={retData.img_path} className="img-thumbnail img-fluid" />
                                        </div>
                                        <div className="col d-flex justify-content-center m-auto">
                                            <span className="fs-1">{el}</span>
                                        </div>
                                    </button>
                                    <div className="col-1 m-auto">
                                        <button id="key" type="button" className="btn btn-outline-transparent text-white fs-1" onClick={handleRemove}><i className="bi bi-x-lg"></i></button>
                                    </div>
                                </div>
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
            {
                bookmarks &&
                bookmarks.length === 0 ? 
                    <div className="d-flex flex-column">
                        <h1 className="text-center text-white my-5">Bookmark a user to see them here</h1>
                    </div>
                    :
                    bookmarks

            }
        </div>
    )

}


