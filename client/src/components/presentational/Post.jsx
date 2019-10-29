import React from 'react'

const Post = ({ post }) => {
  return (
    <div class="posts-box d-flex justify-content-around align-items-center">
      <div class="col-6">
        <div class="row">
          <h1>{post.title}</h1>
        </div>
        <div class="row">
          <p>{post.content}</p>
        </div>
      </div>
      <div class="col-3">
        <p><span style={{ fontWeight: "bold" }}>Beefer:</span>{post.author.username}</p>
      </div>
      {(post.image) ?
        <div class="col-3 d-flex">
          <img src={post.image} alt={`post ${post._id} resource`} height="90px" width="90px;" />
        </div>
        :
        null}
    </div>
  )
}

export default Post