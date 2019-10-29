import React from 'react'
import { Media } from 'react-bootstrap'

const Post = ({ post }) => {
  return (
    <Media as="li">
      {(post.image) ? <img className="mr-3" src={post.image} alt={`post ${post._id} resource`} height={96} width={96} /> : null}
      <Media.Body>
        <h5>{post.title}</h5>
        <p>{post.content}</p>
        <p><span style={{ fontWeight: "bold" }}>Beefer:</span>{post.author.username}</p>
      </Media.Body>
    </Media>
  )
}

export default Post