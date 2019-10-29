import React from 'react'
import { Col, Row, Form } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCamera } from '@fortawesome/free-solid-svg-icons'

class NewPost extends React.Component {
  render() {
    return (
      <Form action="/api/posts" id="np-submit" method="POST" encType="multipart/form-data" >
        <Row>
          <Col md={9}>
            <Form.Control type="text" name="title" placeholder="Post Title:" required />
            <Form.Control as="textarea" rows="3" name="content" placeholder="Post Content:" required />
          </Col>
          <Col md={3}>
            <input className="d-none" type="file" name="file" />
            <label htmlFor="file" className="btn-2"><FontAwesomeIcon icon={faCamera} /></label>
            <button className="btn btn-light">Create Post</button>
          </Col>
        </Row>
      </Form>
    )
  }
}

export default NewPost