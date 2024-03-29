import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { HashRouter, Route, NavLink } from "react-router-dom";
import Configuration from "./configurationpage/Configuration.js";
import Home from "./landingpage/Home.js";

// HashRouter is used to ensure Single-Page-Application status
export default function MyNavbar(props) {
  return (
    <HashRouter>
      <Navbar fixed="top" bg="light" expand="lg">
        <Navbar.Brand>
          <NavLink to="/home">Home </NavLink>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <NavLink to="/config">Configuration</NavLink>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      {/* Route path is the place, where the content of the component should be displayed, after clicking the NavLink */}
      {/* we need "exact path" to tell the router which the "default path" is */}
      <Route exact path="/" component={Home} />
      <Route path="/home" component={Home} />
      <Route path="/config" component={Configuration} />
    </HashRouter>
  );
}
