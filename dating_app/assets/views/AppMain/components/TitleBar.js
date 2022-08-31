import React from "react"

const TitleBar = () => {

    return (
        <nav className="navbar navbar-dark bg-secondary pt-0">
            <div className="container-fluid">
                <a className="navbar-brand d-flex align-items-center" href="#">
                    <span className="material-symbols-outlined mx-1" style={{ "fontSize": "80px" }}>pin</span>
                    <>

                        {
                            window.innerWidth >= 768 ?
                                <span style={{ "fontSize": "35px" }}>Combo Dating App</span>
                                :
                                <span className="fs-1">Combo Dating App</span>
                        }
                    </>

                </a>
            </div>
        </nav>
    )
}

export default TitleBar 