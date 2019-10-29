import React from 'react'
import { Navbar, NavDropdown, Nav, Container } from 'react-bootstrap'
import { isLoggedIn, getLocalStorageUser } from '../../api/users'
import Login from '../forms/Login'
import Signup from '../forms/Signup'

const MainNavbar = () => {
  const [loginModalShow, setLoginModalShow] = React.useState(false);
  const [signupModalShow, setSignupModalShow] = React.useState(false);

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
                  <NavDropdown.Item onClick={() => setSignupModalShow(true)}>Signup</NavDropdown.Item>
                  <NavDropdown.Item onClick={() => setLoginModalShow(true)}>Login</NavDropdown.Item>
                </React.Fragment>
              ) :
                <NavDropdown.Item href="/logout">Logout</NavDropdown.Item>
              }

            </NavDropdown>
          </Navbar.Collapse>
        </Nav>
        <Login show={loginModalShow} onHide={() => setLoginModalShow(false)} />
        <Signup show={signupModalShow} onHide={() => setSignupModalShow(false)} />
      </Container>
    </Navbar>
  )
}

export default MainNavbar