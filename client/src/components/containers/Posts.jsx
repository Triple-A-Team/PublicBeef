import React from 'react'
import PostList from '../presentational/PostList'
class Posts extends React.Component {
  render() {
    return (
      <div className="posts">
        <PostList posts={this.props.posts} />
      </div>
    )
  }
}


export default Posts