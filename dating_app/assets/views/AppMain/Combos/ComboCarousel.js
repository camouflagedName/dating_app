import React, { useEffect, useState } from "react"
import Carousel from 'react-bootstrap/Carousel'
import { Profile } from "../Profile/ProfileMain"

export const ComboCarousel = ({ entryData, setPage }) => {
    const [listItems, setListItems] = useState([])

    const handleClick = (username) => {
        setPage(<Profile setPage={setPage} selUserData={{username: username}} isMine={false} />)
    }

    useEffect(() => {

        const getList = async () => {
            const result = await Promise.all(entryData.map(async entry => {

                const selectedUser = entry.combo_data.creator
                const percentCorrect = (entry.num_correct / 5) * 100

                const picURL = await getPictureURL(selectedUser)
                

                return (
                    <Carousel.Item key={entry.instance_id}>
                        <div className="row justify-content-center">
                            <button type="button" className="btn btn-transparent border border-0" onClick={() => handleClick(selectedUser)}>
                                {
                                    picURL ?
                                        <img src={picURL} className="d-block img-fluid border border-5 border-secondary" style={{ "width": "50rem" }} />
                                        :
                                        <i className="bi bi-hourglass-split text-secondary" style={{ marginTop: "200px", fontSize: "15rem" }}></i>
                                }

                            </button>
                        </div>
                        <Carousel.Caption>
                            <div className="d-flex justify-content-center">
                                <h1 className="me-5 mb-0 p-0 fs-1">{selectedUser}</h1>
                                <span className="fs-1">{percentCorrect}%</span>
                            </div>

                        </Carousel.Caption>
                    </Carousel.Item>
                )
            }))
            setListItems(result)
        }

        getList()

    }, [])


    const getPictureURL = async (username) => {

        try {

            const response = await fetch(`get_image_path/${username}`)

            if (response.ok) {
                const returnData = await response.json()
                const imgCheck = await fetch(returnData.img_path)
                
                if (imgCheck.ok) return returnData.img_path
                else return null
            }
        }

        catch (error) {
            console.log(error)
        }

    }

    return (
        <div className="row bg-dark">
            <div className="col-lg-6 offset-lg-3">
                <Carousel indicators={false} interval={null} >
                    {listItems}
                </Carousel>
            </div>
        </div>
    )
}

//a carousel of completed user combos