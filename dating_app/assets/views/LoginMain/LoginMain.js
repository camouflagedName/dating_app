//this will be the main hub for the login feature
//page will be held in state
//nav tabs "new user" and "returning user" with onclick event
import React from "react";
import { useState, useRef } from "react";
import Tab from "react-bootstrap/Tab"
import Tabs from "react-bootstrap/Tabs"
import Form from "./components/Form";

const LoginMain = (props) => {
    const [pageName, setPageName] = useState("login")

    const handleClick = (target) => {
        setPageName(target)
    }

    return (
        <div className="container">
            <div className="row vh-100">
                <div className="col-10 col-sm-8 col-lg-5 m-auto border border-2 p-3">
                    <div id="page" className="my-3">
                        <Tabs defaultActiveKey="login" id="tab-page" fill onSelect={handleClick}>
                            <Tab eventKey="login" title="Login"/>
                            <Tab eventKey="register" title="Register" />
                        </Tabs>
                    </div>
                    <div id="register" className="d-block">
                        <Form login={props.login} page={pageName} />
                    </div>
                    <div id="login" className="d-none">

                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginMain