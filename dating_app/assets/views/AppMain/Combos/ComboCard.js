import React, { useEffect, useRef, useState } from "react"

export const ComboCard = ({ entryData }) => {
    const [windowThird, setWindowThird] = useState((window.innerHeight / 4))
    const [cardHeight, setCardHeight] = useState(null)
    const cardRef = useRef()

    useEffect(() => {

        

    }, [window.innerHeight])

 
    useEffect(() => {
        setCardHeight(cardRef.current.offsetHeight > windowThird ? {height: windowThird.toString() + 'px'} : null)
    }, [])


    const listRows = entryData.map(entry => {
        return (
            <li key={entry.instance_id} className="list-group-item d-flex fs-5">
                <div className="col">
                    {entry.combo_data.creator}
                </div>
                <div className="col text-center fs-5">
                    {entry.date_solved}
                </div>
                <div className="col text-end fs-5">
                    {entry.num_correct}
                </div>
            </li>
        )
    })

    return (
        <div className="card"  ref={cardRef}>

            <h3 className="card-header d-flex" >
                <div className="col">
                    Name
                </div>
                <div className="col text-center">
                    Date
                </div>
                <div className="col text-end">
                    Correct
                </div>
            </h3>

            <ul className="list-group list-group-flush" style={{...cardHeight, overflow: 'scroll'}}>
                { entryData && listRows }
            </ul>
        </div>

    )
}