import React, { useState, useEffect } from "react"
import Image from 'react-bootstrap/Image'
import { OtherUserRouter } from "../OtherUserProfile/OtherUserRouter"

const PicCarousel = (props) => {
    const [currUser, setCurrUser] = useState({})
    const [prevUser, setPrevUser] = useState(null)
    const [hasData, setHasData] = useState(false)

    useEffect(() => {
        getRandomUser()
    }, [])

    const getRandomUser = async () => {
        try {
            const fetchData = await fetch(`get_random_user/${props.userID}`)

            if (fetchData.ok) {
                const userData = await fetchData.json()

                if (userData) {
                    const imgCheck = await fetch(userData.picture)

                    if (imgCheck.ok) {
                        setCurrUser(userData)
                    }
                    else (
                        setCurrUser({ username: userData.username})
                    )
                    setHasData(true)
                }
            }
        }

        catch (error) {
            console.log(error)
        }
    }

    const handleClick = (event) => {

        if (event.currentTarget.id === "next") {
            setPrevUser(currUser)
            getRandomUser()
        }

        else {
            setCurrUser(prevUser)
            setPrevUser(null)
        }
    }

    const pictureClick = event => {
        if (event.currentTarget.id === "picture-carousel") {
            props.setPage(<OtherUserRouter setPage={props.setPage} selUserData={currUser} isMine={false} />)
        }
    }

    return (
        <>
            {
                !currUser ?
                    <h1 className="text-center text-white">No Users Yet</h1>
                    :
                    <>
                        <div id="imageCarousel" className="carousel slide col-lg-8 offset-lg-2 d-flex justify-content-center" style={{ marginTop: "125px" }} data-bs-ride="carousel">
                            <button id="picture-carousel" type="button" className="btn border border-0" onClick={pictureClick}>
                                <div className="carousel-inner">
                                    <div className="carousel-item active border border-5 border-secondary rounded">
                                        {
                                            hasData &&

                                            <>
                                                {
                                                    currUser.picture ?
                                                    
                                                        <Image src={currUser.picture} fluid style={{ "width": "50rem" }} />
                                                        :
                                                        <i className="bi bi-hourglass-split text-white" style={{ marginTop: "200px", fontSize: "15rem" }}></i>
                                                }
                                            </>
                                        }


                                    </div>
                                </div>
                            </button>
                            {
                                prevUser ?
                                    <>
                                        <button id="prev" className="carousel-control-prev" type="button" data-bs-target="#imageCarousel" data-bs-slide="prev" onClick={handleClick}>
                                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                            <span className="visually-hidden">Previous</span>
                                        </button>

                                    </>
                                    :
                                    <></>
                            }
                            <button id="next" className="carousel-control-next text-dark" type="button" data-bs-target="#imageCarousel" data-bs-slide="next" onClick={handleClick}>
                                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                <span className="visually-hidden">Next</span>
                            </button>
                        </div>
                        <div className="col col-lg-8 offset-lg-2 justify-content-center mb-5">
                            <div className="row">
                                <div className="col text-center">
                                    <button type="button" className="btn btn-outline-light border border-0 fs-3" aria-label="lock" disabled>
                                        <i className="bi bi-lock-fill"></i>
                                        <p>Locked</p>
                                    </button>
                                </div>
                                <div className="col text-center">
                                    <h1 className="text-white mt-3">{currUser.username}</h1>
                                </div>
                                <div className="col text-center">
                                    <button type="button" className="btn btn-outline-light border border-0 fs-3" aria-label="bookmark" disabled>
                                        <i className="bi bi-bookmark"></i>
                                        <p>Bookmark</p>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </>
            }
        </>
    )
}

export default PicCarousel