import React from 'react'
import PostList from '../presentational/PostList'
class Posts extends React.Component {
  render() {
    return (
      <div className="posts">
        <PostList posts={this.props.posts} userPos={this.props.userPos} />
      </div>
    )
  }
}


export default Posts