import React from "react"
import Nav from 'react-bootstrap/Nav'

const NavBar = (props) => {

    const handleSelect = (target) => {
        props.handleClick(target)
    }

    return(
        <Nav justify variant="pills" defaultActiveKey="home" onSelect={handleSelect} className="bg-secondary">
            <Nav.Item>
                <Nav.Link eventKey="profile" className="text-white">Profile</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link eventKey="home" className="text-white">Home</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link eventKey="combos" className="text-white">Combos</Nav.Link>
            </Nav.Item>
        </Nav>
    )
}

export default NavBar