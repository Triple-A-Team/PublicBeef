import React from 'react'
import Posts from './Posts'
import Chats from './Chats'
import NewPost from '../forms/NewPost'
import { Col, Row, Container } from 'react-bootstrap'

const Home = () => {
  return (
    <Row>
      <Col mx={0} px={0} md={4}>
        <Container>
          <h1>Public Beefs</h1>
          <Posts />
          <NewPost />
        </Container>
      </Col>
      <Col mx={0} px={0} md={4}>
        <Container>
          <h1>Private Beefs</h1>
          <Chats />
        </Container>
      </Col>
      <Col mx={0} px={0} md={4}>
        <Container>
          <h1>Beefer</h1>
        </Container>
      </Col>
    </Row>
  )
}



export default Home