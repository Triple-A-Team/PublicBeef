import React, { useState, useEffect } from 'react';
import Posts from './Posts'
import ProfileCard from '../presentational/ProfileCard'
import Chats from './Chats'
import NewPost from '../forms/NewPost'
import { Col, Row, Container } from 'react-bootstrap'
import { getLocalStorageUser } from '../../api/users'

const Home = () => {
  const [user, setUser] = useState(0);

  useEffect(() => {
    setUser(getLocalStorageUser())
  }, []);

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
        <Container style={{height: '100%'}}>
          <h1>Private Beefs</h1>
          <Chats />
        </Container>
      </Col>
      <Col mx={0} px={0} md={4}>
        <Container>
          <h1>Beefer</h1>
          <ProfileCard user={user} />
        </Container>
      </Col>
    </Row>
  )
}



export default Home