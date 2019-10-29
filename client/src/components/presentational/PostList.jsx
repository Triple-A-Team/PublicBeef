import React from 'react'
import Post from '../presentational/Post'

const PostList = ({ posts }) => {
  return (
    <ul className="list-unstyled">
      {posts.map(post => <Post key={post._id} post={post} />)}
    </ul>
  )
}

export default PostList