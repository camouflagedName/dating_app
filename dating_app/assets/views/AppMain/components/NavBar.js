import React from "react"
import Nav from 'react-bootstrap/Nav'

const NavBar = (props) => {

    const handleSelect = (target) => {
        props.handleClick(target)
    }

    return(
        <Nav justify variant="pills" defaultActiveKey="home" onSelect={handleSelect}>
            <Nav.Item>
                <Nav.Link eventKey="profile">Profile</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link eventKey="home">Home</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link eventKey="combos">Combos</Nav.Link>
            </Nav.Item>
        </Nav>
    )
}

export default NavBar