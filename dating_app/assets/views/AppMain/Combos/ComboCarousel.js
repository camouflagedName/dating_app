import React, { useEffect, useState } from "react";
import Carousel from 'react-bootstrap/Carousel';

export const ComboCarousel = ({ entryData }) => {
    const [listItems, setListItems] = useState([])


    useEffect(() => {

        const getList = async () => {
            const result = await Promise.all(entryData.map(async entry => {

                const selectedUser = entry.combo_data.creator
                const percentCorrect = (entry.num_correct / 5) * 100

                const picURL = await getPictureURL(selectedUser)


                return (
                    <Carousel.Item>
                        <div className="row justify-content-center">
                            <img src={picURL} className="d-block w-50" style={{ "width": "20rem" }} />
                        </div>

                        <Carousel.Caption>
                            <h1>{selectedUser}</h1>
                            <span className="fs-1">{percentCorrect}%</span>
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
                return returnData.img_path
            }
        }

        catch (error) {
            console.log(error)
        }

    }

    return (
        <div className="row bg-dark">
            <div className="col-6 offset-3">
                <Carousel indicators={false} interval={null} >
                    {listItems}
                </Carousel>
            </div>
        </div>
    )
}

//a carousel of completed user combos