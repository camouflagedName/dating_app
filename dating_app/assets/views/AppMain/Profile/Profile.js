import React, { useState } from "react"
import Tab from "react-bootstrap/Tab"
import Tabs from "react-bootstrap/Tabs"
import { Facts } from "./Facts"
import { Info } from "./Info"

export const Profile = () => {

    const [page, setPage] = useState(<Facts />)

    const handleClick = (target) => {
        switch (target) {
            case "facts": setPage(<Facts />)
                break
            case "info": setPage(<Info />)
                break
        }
    }

    return (

        <div className="card border border-0">
            <div className="text-center border border-2 col-6 offset-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" fill="currentColor" className="bi bi-person-plus-fill" viewBox="0 0 16 16">
                    <path d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                    <path fill-rule="evenodd" d="M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5z" />
                </svg>
                <p>Add Image</p>
            </div>
            <div className="card-body">
                <div className="mb-0">
                    <Tabs defaultActiveKey="facts" id="tab-page" fill onSelect={handleClick}>
                        <Tab eventKey="facts" title="Quick Facts" />
                        <Tab eventKey="info" title="User Info" />
                    </Tabs>
                </div>
                {page}
            </div>
        </div>
    )
}

//            <img src="..." className="card-img-top" alt="..." />