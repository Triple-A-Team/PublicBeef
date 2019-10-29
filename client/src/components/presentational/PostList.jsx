import React from 'react'
import Post from '../presentational/Post'

const PostList = ({ posts }) => {
  return (
    posts.map(post => <Post key={post._id} post={post} />)
  )
}

export default PostList