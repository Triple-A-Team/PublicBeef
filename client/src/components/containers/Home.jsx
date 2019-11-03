import React from 'react';
import Posts from './Posts'
import ProfileCard from '../presentational/ProfileCard'
import Chats from './Chats'
import NewPost from '../forms/NewPost'
import { getPosts } from '../../api/posts'
import { Col, Row, Container } from 'react-bootstrap'
import { getLocalStorageUser, getCurrentUser, isLoggedIn } from '../../api/users'
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';

class Home extends React.Component {
  constructor(props) {
    super(props)
    this.profileCardRef = React.createRef();
  }

  state = {
    user: null,
    posts: [],
    mapWidth: { width: '100px', height: '100px' },
    coords: { lat: 25.766111, lng: -80.196183 }
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
    this.setComputedMapSize()
    window.addEventListener("resize", this.setComputedMapSize);
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

  displayMarkers = () => {
    return this.state.posts.map((post, index) => {
      const position = {
        lat: post.location.coordinates[1],
        lng: post.location.coordinates[0]
      }
      return <Marker key={index} position={position} onClick={() => console.log("You clicked me!")} />
    })
  }

  setComputedMapSize = () => {
    this.setState({ mapWidth: this.profileCardRef.current ? this.profileCardRef.current.clientWidth : '100px' })
  }

  render = () => {
    return (
      <Row>
        <Col mx={0} px={0} md={4}>
          <Container>
            <h1>Public Beefs</h1>
            <Posts posts={this.state.posts} userPos={this.state.coords} />
            <NewPost />
          </Container>
        </Col>
        <Col mx={0} px={0} md={4}>
          <Container style={{ height: '95%' }}>
            <h1>Private Beefs</h1>
            <Chats />
          </Container>
        </Col>
        <Col mx={0} px={0} md={4}>
          <Container>
            <h1>Beefer</h1>
            <div ref={this.profileCardRef} className="media">
              <ProfileCard style={{ width: this.state.mapWidth, height: '50vh' }} user={this.state.user} />
            </div>
            <Map google={this.props.google} zoom={8} style={{ position: "relative", width: this.state.mapWidth, height: '32vh' }} initialCenter={this.state.coords} onClick={this.onMapClicked}>
              {this.state.posts && this.displayMarkers()}
            </Map>
          </Container>
        </Col>
      </Row >
    )
  }
}

export default GoogleApiWrapper({ apiKey: 'AIzaSyArRtbosA04IjMlWJVkm2yHW-bA2iaX0Hc' })(Home)