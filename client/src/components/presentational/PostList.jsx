import React, { useEffect } from 'react';
import Post from '../presentational/Post'
import { ListGroup } from 'react-bootstrap'

const PostList = ({ posts }) => {
  const updateScrollHeight = () => {
    const postListUL = document.getElementById('postList');
    postListUL.scrollTop = postListUL.scrollHeight;
  }

  useEffect(() => {
    updateScrollHeight()
    window.addEventListener("resize", updateScrollHeight);
  }, [posts]);

  return (
    <ListGroup id="postList" style={{ maxHeight: '70vh', overflowY: 'auto', WebkitOverflowScrolling: 'touch' }} variant="flush">
      {posts.map(post => <Post key={post._id} post={post} />)}
    </ListGroup>
  )
}

export default PostList