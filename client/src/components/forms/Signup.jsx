import React from 'react'
import { Col, Row, Form, Button, Modal } from 'react-bootstrap'
import { signupUser } from '../../api/users'
import { Redirect } from 'react-router-dom'

class Signup extends React.Component {
  constructor(props) {
    super(props)
    this.username = React.createRef();
    this.nickname = React.createRef();
    this.password = React.createRef();
    this.email = React.createRef();
    this.bio = React.createRef();
    this.city = React.createRef();
    this.avatar = React.createRef();
  }

  state = {
    loggedIn: false
  }

  handleSubmit = async event => {
    event.preventDefault()
    const username = this.username.current.value
    const password = this.password.current.value
    const nickname = this.nickname.current.value
    const email = this.email.current.value
    const bio = this.bio.current.value
    const city = this.city.current.value

    await signupUser({ username, password, nickname, email, bio, city })
    this.setState({ loggedIn: true }, this.props.onHide())
  }

  render() {
    if (this.state.loggedIn) {
      return <Redirect to='/' />
    }

    return (
      <Modal show={this.props.show} onHide={this.props.onHide}>
        <Modal.Header closeButton>
          <Modal.Title>User Signup</Modal.Title>
        </Modal.Header>
        <Form onSubmit={this.handleSubmit}>
          <Row>
            <Col md={9}>
              <Form.Control autoComplete="user-username" type="text" name="username" placeholder="Your name" ref={this.username} required />
              <Form.Control autoComplete="user-nickname" type="text" name="nickname" placeholder="Your nickname (optional)" ref={this.nickname} />
              <Form.Control autoComplete="user-password" type="password" name="password" placeholder="Your password" ref={this.password} required />
              <Form.Control autoComplete="user-email" type="email" name="city" placeholder="email@gmail.com" ref={this.email} required />
              <Form.Control autoComplete="user-avatar" type="file" name="avatar" placeholder="avatar (optional)" ref={this.avatar} />
              <Form.Control autoComplete="user-bio" type="text" name="city" placeholder="Your Bio (optional)" ref={this.bio} />
              <Form.Control autoComplete="user-city" type="text" name="city" placeholder="Your City (optional)" ref={this.city} />
            </Col>
            <Col md={3}>
              <Button variant="primary" type="submit">Sign Up</Button>
            </Col>
          </Row>
        </Form>
      </Modal>
    )
  }
}

export default Signup