import React from 'react'
import { Col, Row, Form, Button, Modal } from 'react-bootstrap'
import { loginUser } from '../../api/users'
import { Redirect } from 'react-router-dom'

class Login extends React.Component {
  constructor(props) {
    super(props)
    this.username = React.createRef();
    this.password = React.createRef();
  }

  state = {
    loggedIn: false,
  }

  handleSubmit = async event => {
    event.preventDefault()
    const username = this.username.current.value
    const password = this.password.current.value
    await loginUser(username, password)
    this.setState({ loggedIn: true })
  }

  render() {
    if (this.state.loggedIn) {
      return <Redirect to='/' />
    }

    return (
      <Modal show={this.props.show} onHide={this.props.onHide}>
        <Modal.Header closeButton>
          <Modal.Title>User Login</Modal.Title>
        </Modal.Header>
        <Form onSubmit={this.handleSubmit}>
          <Row>
            <Col md={9}>
              <Form.Control autoComplete="user-username" type="text" name="username" placeholder="Your name" ref={this.username} required />
              <Form.Control autoComplete="user-password" type="password" name="password" placeholder="Your password" ref={this.password} required />
            </Col>
            <Col md={3}>
              <Button variant="primary" type="submit">Login</Button>
            </Col>
          </Row>
        </Form>
      </Modal>
    )
  }
}

export default Login