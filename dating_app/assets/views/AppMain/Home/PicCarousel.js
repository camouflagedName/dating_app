import React, { useState, useEffect } from "react"
import Image from 'react-bootstrap/Image'
import { OtherUserRouter } from "../OtherUserProfile/OtherUserRouter"

const PicCarousel = (props) => {
    const [currUser, setCurrUser] = useState({})
    const [prevUser, setPrevUser] = useState(null)
    const [users, setUsers] = useState(true)

    useEffect(() => {
        getRandomUser()
    }, [])

    const getRandomUser = async () => {
        try {
            const fetchData = await fetch(`get_random_user/${props.userID}`)

            if (fetchData.ok) {
                const userData = await fetchData.json()
                if (userData.users) {
                    setCurrUser(userData)
                }
                else console.log("DO NOTHING")
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
            props.setPage(<OtherUserRouter selectedUsername={currUser.username} setPage={props.setPage} selUserData={currUser} />)
        }
    }


    return (
        <>
            {

                users ?
                    <h1 className="text-center text-white">No Users Yet</h1>
                    :
                    <div id="imageCarousel" className="carousel slide col-sm-8 offset-sm-2 col-md-6 offset-md-3 col-xl-4 offset-xl-4 d-flex justify-content-center" data-bs-ride="carousel">
                        <button id="picture-carousel" type="button" className="btn border border-0" onClick={pictureClick}>
                            <div className="carousel-inner">
                                <div className="carousel-item active bg-secondary">

                                    {
                                        currUser.picture ?
                                            <Image src={currUser.picture} rounded fluid style={{ "width": "500px" }} />
                                            :
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-person-square" viewBox="0 0 16 16">
                                                <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                                                <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm12 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1v-1c0-1-1-4-6-4s-6 3-6 4v1a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12z" />
                                            </svg>
                                    }

                                    <div className="carousel-caption d-block">
                                        <h1>{currUser.username}</h1>
                                        <button type="button" data-bs-target="#imageCarousel" className="btn btn-outline-light border border-0 fs-3" aria-label="like" disabled>
                                            <i className="bi bi-heart-fill"></i>
                                        </button>
                                    </div>
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
            }
        </>
    )
}

export default PicCarousel