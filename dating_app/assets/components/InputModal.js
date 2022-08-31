import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";

export const InputModal = (props) => {
    const [allData, setallData] = useState([])
    const [listElement, setListElement] = useState([])
    const [countryList, setCountryList] = useState([])
    const [countryValue, setCountryValue] = useState(null)
    const [cityValue, setCityValue] = useState('')
    const [cityRenderList, setCityRenderList] = useState([])

    //setMainPage(<ComboMainDirectory isMine setPage={setMainPage}/>)

    const handleclick = evt => {
        if (evt.target.id === 'cancel') props.showModal(false)
        else {
            let locationValue = allData[countryValue].cities[cityValue] + ', ' + allData[countryValue].country
            props.setValue(props.title, locationValue )
            props.showModal(false)
        }
    }

    const getData = async (URL) => {
        try {
            const response = await fetch('https://countriesnow.space/api/v0.1/countries')

            if (response.ok) {
                const returnData = await response.json()
                const dataArray = returnData.data
                mapArray(dataArray, setCountryList)
                setallData(dataArray)
            }
        }

        catch (error) {
            console.log(error)
        }
    }

    const mapArray = (data, renderList) => {
        const list = data.map((entry, index) => {
            if (entry.country) {
                return (
                    <option className="mx-5" value={index}>{entry.country}</option>
                )
            }
            return (
                <option className="mx-5" value={index}>{entry}</option>
            )


        })
        renderList(list)
    }

    useEffect(() => {

        if (countryValue) {
            const countryData = allData[countryValue]
            const cityArray = countryData.cities
            mapArray(cityArray, setCityRenderList)
        }
    }, [countryValue])

    useEffect(() => {
        getData(URL)
    }, [])

    return (
        <Modal show={true} centered>
            <Modal.Header>
                <Modal.Title>Location</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="d-flex flex-column justify-content-center bg-dark">
                    <div className="mx-5 mt-5 mb-3">
                        <Option title={"country"} listOptions={countryList} setValue={setCountryValue} />
                    </div>
                    {
                        cityRenderList.length > 0 &&
                        <div className="mx-5 mb-5 mt-3">
                            <Option title={"city"} listOptions={cityRenderList} setValue={setCityValue} />
                        </div>
                    }
                </div>
            </Modal.Body>
            <Modal.Footer>
                <div className="row">
                    <div className="col">
                        <button id="cancel" className="btn btn-danger" onClick={handleclick}>Cancel</button>
                    </div>
                    {
                        cityValue &&
                        <div className="col">
                            <button id="accept" className="btn btn-primary" onClick={handleclick}>Update</button>
                        </div>
                    }

                </div>
            </Modal.Footer>
        </Modal >
    )
}

const Option = ({ title, listOptions, setValue }) => {
    const handleChange = (evt) => {
        setValue(evt.target.value)
    }

    return (
        <select id={title} className="form-select text-center" aria-label="select gender" onChange={handleChange}>
            <option selected>Choose your {title}</option>
            {listOptions}
        </select>
    )
}