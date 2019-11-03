import React from 'react'
import { Media, ListGroup } from 'react-bootstrap'
import { getLatLonNeighborhood } from '../../api/map'

const getMapData = async (lat, lon) => {
  var postArea = 'Not Available.'
  try {
    const mapData = await getLatLonNeighborhood(lat, lon)
    if (mapData.features.length === 6) postArea = mapData.features[1].place_name
    if (mapData.features.length === 5) postArea = mapData.features[3].place_name
  } finally {
    return postArea
  }
}


const Post = ({ post }) => {
  const [postArea, setPostArea] = React.useState('Not Loaded Yet');

  React.useEffect(() => {
    getMapData(post.location.coordinates[0], post.location.coordinates[1])
      .then(postArea => setPostArea(postArea))

  }, [post.location.coordinates]);

  return (
    <ListGroup.Item>
      <Media as="li">
        {(post.image) ? <img className="mr-3" src={post.image} alt={`post ${post._id} resource`} height={96} width={96} /> : null}
        <Media.Body>
          <h5>{post.title}</h5>
          <p>{post.content}</p>
          <p><span style={{ fontWeight: "bold" }}>Beefer: </span>{post.author.username}</p>
          <p><span style={{ fontWeight: "bold" }}>Location: </span>{`[lat: ${post.location.coordinates[1]}, lon: ${post.location.coordinates[0]}]: ${postArea}`}</p>
        </Media.Body>
      </Media>
    </ListGroup.Item>
  )
}

export default Post