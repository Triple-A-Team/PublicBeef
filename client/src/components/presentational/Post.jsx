import React from 'react'
import './Post.scss'
import { Media, ListGroup } from 'react-bootstrap'
import { getLatLonNeighborhood } from '../../api/map'
import CommentList from './CommentList'
import moment from 'moment'

function latLongDistanceInMiles(lat1, lon1, lat2, lon2) {
  var p = 0.017453292519943295; // Math.PI / 180
  var c = Math.cos;
  var a = 0.5 - c((lat2 - lat1) * p) / 2 + c(lat1 * p) * c(lat2 * p) * (1 - c((lon2 - lon1) * p)) / 2;
  // 2 * R; R = 6371 km
  return (12742 * Math.asin(Math.sqrt(a))) * 0.621371;
}

const getMapData = async (lat, lon) => {
  var postArea = 'Not Available'
  try {
    const mapData = await getLatLonNeighborhood(lat, lon)
    if (mapData.features.length === 6) postArea = mapData.features[1].place_name
    if (mapData.features.length === 5) postArea = mapData.features[3].place_name
  } finally {
    return postArea
  }
}

const Post = ({ post, userPos }) => {
  const [postArea, setPostArea] = React.useState('Not Loaded Yet');

  React.useEffect(() => {
    getMapData(post.location.coordinates[0], post.location.coordinates[1])
      .then(postArea => setPostArea(postArea))
  }, [post.location.coordinates]);

  const [lng, lat] = post.location.coordinates
  const { lat: ulat, lng: ulng } = userPos

  return (
    <ListGroup.Item>
      <Media as="li">
        {(post.image) ? <img className="mr-3" src={post.image} alt={`post ${post._id} resource`} height={96} width={96} /> : null}
        <Media.Body className="post-body">
          <h5>{post.title}</h5>
          <p style={{ overflow: 'hidden', lineHeight: '1.5rem', height: '4.5rem' }}>{post.content}</p>
          <p style={{ lineHeight: '1rem' }}><span style={{ fontWeight: "bold" }}>Beefer: </span>{post.author.username}</p>
          <p><span style={{ fontWeight: "bold" }}>Distance: </span>{`${latLongDistanceInMiles(ulat, ulng, lat, lng).toFixed(2)} miles away`}</p>
          <p><span style={{ fontWeight: "bold" }}>Location: </span>{` ${postArea}`}</p>
          <p><small>{`lat: ${lat}, lon: ${lng}: ${moment(post.created_at).toNow(true)} ago`}</small></p>
        </Media.Body>
      </Media>
      <CommentList postId={post._id} comments={post.comments} />
    </ListGroup.Item >
  )
}

export default Post