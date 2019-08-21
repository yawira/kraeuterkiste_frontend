import React from 'react'
import {Navbar, Nav, Button} from 'react-bootstrap';

export default function MyNavbar(props) {
    
        return (
            <Navbar fixed="top" bg="light" expand="lg">
            <Navbar.Brand href="#home">Home</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                <Nav.Link href="#home">Configuration</Nav.Link>
                </Nav>
                <Button variant="outline-danger">Sign Out</Button>
            </Navbar.Collapse>
            </Navbar>
        );
}

  


