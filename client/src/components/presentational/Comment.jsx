import React from 'react'
import './Post.scss'
import { Media, ListGroup } from 'react-bootstrap'

const Comment = ({ comment }) => {
  return (
    <ListGroup.Item>
      <Media as="li">
        <Media.Body className="post-body">
          <p>{comment.content}</p>
          <p style={{ lineHeight: '1rem' }}><span style={{ fontWeight: "bold" }}>Beefer: </span>{comment.author.username}</p>
        </Media.Body>
        {(comment.author.avatar) ? <img className="mr-3" src={comment.author.avatar} alt={`comment ${comment._id} resource`} height={96} width={96} /> : null}
      </Media>
    </ListGroup.Item >
  )
}

export default Comment