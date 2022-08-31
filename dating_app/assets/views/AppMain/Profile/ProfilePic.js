import React, { createRef, useContext, useEffect, useState } from "react";
import Image from 'react-bootstrap/Image'
import sendData from "../../../utils/sendData";
import { ConfirmModal } from "../../../components/ConfirmModal";
import { GlobalData } from "../../../utils/GlobalData";

const tempIcon =
    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-person-plus-fill" viewBox="0 0 16 16">
        <path d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
        <path fillRule="evenodd" d="M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5z" />
    </svg>

export const ProfilePic = ({ isMine, selUserData }) => {
    const [fileDataURI, setFileDataURI] = useState(null)
    const [image, setImage] = useState(null)
    const [imagePreview, setImagePreview] = useState()
    const [showModal, setShowModal] = useState(false)
    const [pictureURL, setPictureURL] = useState()
    const [hasData, setHasData] = useState(false)
    const userData = useContext(GlobalData)

    const getImage = async () => {
        const username = isMine ? userData.tier2.username : selUserData.username
        try {
            const response = await fetch(`get_image_path/${username}`)

            if (response.ok) {
                const responseData = await response.json()
                const imgCheck = await fetch(responseData.img_path)
                setHasData(true)
                if (imgCheck.ok) {
                    setPictureURL(responseData.img_path)
                    
                }
            }
        }

        catch (error) {
            console.log(error)
        }
    }

    const setReturn = () => {
        setShowModal(false)
    }

    const handleChange = evt => {
        if (evt.target.files[0] && evt.target.files[0].name) {
            setImage(evt.target.files[0])
            let fileReader = new FileReader()
            fileReader.onload = (event) => setFileDataURI(event.target.result)
            fileReader.readAsDataURL(evt.target.files[0])
            setShowModal(true)

        }
    }

    const sendImageFile = async () => {
        let data = new FormData()
        data.append("image", image)
        data.append("name", image.name)
        const URL = `upload_image/${userData.private.id}`
        try {
            const response = await sendData(data, URL, true)

            if (response.ok) {
                getImage()
            }

        }

        catch (error) {
            console.log(error)
        }
    }

    const handleSubmit = () => {
        //sendImageFile()
    }

    useEffect(() => {
        getImage()
    }, [])

    useEffect(() => {
        setImagePreview(
            <div className="row flex-column">
                <div className="col">
                    <Image src={fileDataURI} thumbnail roundedCircle fluid style={{ "width": "150rem" }} />
                </div>
                <div className="col">
                    <button type="button mx-auto" className="btn btn-outline-success" onClick={handleSubmit}>Save Image?</button>
                </div>
            </div>
        )
    }, [fileDataURI])

    const defaultImg =
        <>
            <div className="row">
                <div className="col">
                    <label htmlFor="pic_upload">
                        <div className="offset-1">
                            <>
                                {
                                    tempIcon
                                }
                            </>
                        </div>
                        <div className="fs-3">Add Image</div>
                    </label>
                </div>
                {
                    isMine &&
                    <input type="file" id="pic_upload" name="pic_upload" style={{ "opacity": 0, "width": "1px" }} accept="image/*" className="p-0 m-0" onChange={handleChange} />
                }
            </div>
        </>


    const userImage =
        <div className="row flex-column">
            <div className="col">
                <label htmlFor="pic_upload">
                    <Image src={pictureURL} thumbnail roundedCircle fluid style={{ "width": "25rem" }} />
                </label>
            </div>
            {
                isMine &&
                <input type="file" id="pic_upload" name="pic_upload" style={{ "opacity": 0, "width": "1px" }} accept="image/*" className="p-0 m-0" onChange={handleChange} />
            }
        </div>

    return (
        <div className="text-center rounded col-6 offset-3 py-3">
            {
                showModal ?
                    <ConfirmModal setReturn={setReturn} submit={sendImageFile}>
                        <Image src={fileDataURI} thumbnail roundedCircle fluid style={{ "width": "65%" }} />
                    </ConfirmModal>
                    :
                    <>
                        {
                            hasData &&
                            <>
                                {
                                    pictureURL ?
                                        <>
                                            {userImage}
                                        </>
                                        :
                                        <>
                                            {defaultImg}
                                        </>
                                }
                            </>
                        }
                    </>
            }
        </div>
    )
}