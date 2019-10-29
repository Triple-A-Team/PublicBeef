import React, { useEffect } from 'react';
import Post from '../presentational/Post'
import { ListGroup } from 'react-bootstrap'

const onNewPostSubmit = () => {
  document.getElementById('theForm').onsubmit = ((e) => {
    e.preventDefault();

    let postObject = new FormData()
    postObject.append('title', document.getElementById('title').value)
    postObject.append('content', document.getElementById('content').value)
    postObject.append('image', document.getElementById('file').files[0])
  })
}

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