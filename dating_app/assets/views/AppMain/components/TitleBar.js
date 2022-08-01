import React from "react"

const TitleBar = () => {

    return (
        <nav className="navbar navbar-light bg-light pt-0">
            <div className="container-fluid">
                <a className="navbar-brand d-flex align-items-center" href="#">
                    <span className="material-symbols-outlined mx-1" style={{"fontSize": "80px"}}>pin</span>
                    <span style={{"fontSize": "35px"}}>Combo Dating App</span>
                </a>
            </div>
        </nav>
    )
}

export default TitleBar 