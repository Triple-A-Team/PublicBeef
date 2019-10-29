import React from 'react'
import { Navbar, NavDropdown, Nav, Container } from 'react-bootstrap'
import { isLoggedIn, getLocalStorageUser } from '../../api/users'

const MainNavbar = () => {
  return (
    <Navbar collapseOnSelect bg="dark" variant="dark" expand="sm">
      <Container fluid="true">
        <Navbar.Brand href="/">PUBLIC BEEF</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href='/beef'>Beef</Nav.Link>
        </Nav>
        <Nav>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <NavDropdown title={isLoggedIn() ? getLocalStorageUser().username : "Account"} id="collasible-nav-dropdown">
              {!isLoggedIn() ? (
                <React.Fragment>
                  <NavDropdown.Item href="/signup">Signup</NavDropdown.Item>
                  <NavDropdown.Item href="/login">Login</NavDropdown.Item>
                </React.Fragment>
              ) :
                <NavDropdown.Item href="/logout">Logout</NavDropdown.Item>
              }

            </NavDropdown>
          </Navbar.Collapse>
        </Nav>
      </Container>
    </Navbar>
  )
}

export default MainNavbar