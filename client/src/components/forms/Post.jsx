import React from 'react'

class NewPost extends React.Component {
  render() {
    return (
      <div className="new-post">
        <form action="/api/posts" id="np-submit" method="POST" enctype="multipart/form-data">
          <label for="title">Title</label>
          <input type="text" name="title" placeholder="Post Title" required />

          <label for="content">Content</label>
          <input type="text" name="content" placeholder="Post Content" required />

          <label for="image">Image</label>
          <input type="file" name="image" />

          <button className="btn btn-danger">Create Post</button>
        </form>
      </div>
    )
  }
}

export default NewPost