import React from 'react'
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Navbar, NavDropdown, Nav, Container, Button } from 'react-bootstrap'

const MainNavbar = () => {
  return (
    <Navbar collapseOnSelect bg="dark" variant="dark" expand="lg">
      <Container fluid="true">
        <Button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"> <FontAwesomeIcon icon={faBars} /><i className="fas fa-bars"></i></span>
        </Button>

        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Navbar.Brand href="/">PUBLIC BEEF</Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Link href='/beef'>Beef</Nav.Link>
          </Nav>
          <Nav>
            <NavDropdown title="Account" id="collasible-nav-dropdown">
              <NavDropdown.Item href="/signup">Signup</NavDropdown.Item>
              <NavDropdown.Item href="/login">Login</NavDropdown.Item>
              <NavDropdown.Item href="/logout">Logout</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default MainNavbar