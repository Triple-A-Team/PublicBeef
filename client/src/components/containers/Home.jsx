import React from 'react';
import Posts from './Posts'
import ProfileCard from '../presentational/ProfileCard'
import Chats from './Chats'
import NewPost from '../forms/NewPost'
import { getPosts } from '../../api/posts'
import { Col, Row, Container, Media } from 'react-bootstrap'
import { getLocalStorageUser, getCurrentUser, isLoggedIn } from '../../api/users'
import { Circle, Map, GoogleApiWrapper, Marker } from 'google-maps-react';

const mapStyles = {
  width: '300px',
  height: '300px',
};

class Home extends React.Component {
  state = {
    user: null,
    posts: [],
    coords: { lat: 25.766111, lng: -80.196183 }
  }

  onMapClicked = () => {
    console.log('clicked!')
  }

  setPosition = async () => {
    if (isLoggedIn()) {
      let user = await getCurrentUser()
      if (user.location) {
        this.setState({ coords: { lat: user.location.coordinates[0], lng: user.location.coordinates[1] } })
      }
    }
  }

  getPosts = async () => {
    let posts = await getPosts(this.state.coords.lat, this.state.coords.lng)
    return posts
  }

  componentDidMount = () => {
    const user = getLocalStorageUser()
    this.setPosition()
    const posts = this.getPosts()
    posts.then(
      result => {
        this.setState({
          posts: result,
          user
        })
      }
    )
  }

  displayCircle = () => {
    return (
      <Circle
        radius={1200}
        center={this.state.coords}
        onMouseover={() => console.log('mouseover')}
        onClick={() => console.log('click')}
        onMouseout={() => console.log('mouseout')}
        strokeColor='transparent'
        strokeOpacity={0}
        strokeWeight={5}
        fillColor='#FF0000'
        fillOpacity={0.2}
      />
    )
  }

  displayMarkers = () => {
    return this.state.posts.map((post, index) => {
      const position = {
        lat: post.location.coordinates[1],
        lng: post.location.coordinates[0]
      }
      return <Marker key={index} position={position} onClick={() => console.log("You clicked me!")} />
    })
  }

  userCoords = () => {
    return { lat: 25.766111, lng: -80.196183 }
  }

  render = () => {
    return (
      <Row>
        <Col mx={0} px={0} md={4}>
          <Container>
            <h1>Public Beefs</h1>
            <Posts posts={this.state.posts} />
            <NewPost />
          </Container>
        </Col>
        <Col mx={0} px={0} md={4}>
          <Container style={{ height: '100%' }}>
            <h1>Private Beefs</h1>
            <Chats />
          </Container>
        </Col>
        <Col mx={0} px={0} md={4}>
          <Container>
            <h1>Beefer</h1>
            <ProfileCard user={this.state.user} />
            <Media>
              <Map google={this.props.google} zoom={8} mapStyles={mapStyles} initialCenter={this.state.coords} onClick={this.onMapClicked}>
                {this.state.posts && this.displayMarkers()}
                {/* <Circle
                  radius={1200}
                  center={this.state.coords}
                  onMouseover={() => console.log('mouseover')}
                  onClick={() => console.log('click')}
                  onMouseout={() => console.log('mouseout')}
                  strokeColor='transparent'
                  strokeOpacity={0}
                  strokeWeight={5}
                  fillColor='#FF0000'
                  fillOpacity={0.2}
                /> */}
              </Map>
            </Media>
          </Container>
        </Col>
      </Row >
    )
  }
}

export default GoogleApiWrapper({ apiKey: 'AIzaSyArRtbosA04IjMlWJVkm2yHW-bA2iaX0Hc' })(Home)