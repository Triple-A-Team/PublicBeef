import React from 'react'
import PostList from '../presentational/PostList'
import { getPosts } from '../../api/posts'
import { getCurrentUser } from '../../api/users'
class Posts extends React.Component {
  state = {
    posts: []
  }

  onNewPostSubmit = () => {

    document.getElementById('theForm').onsubmit = ((e) => {
      e.preventDefault();

      let postObject = new FormData()
      postObject.append('title', document.getElementById('theTitle').value)
      postObject.append('content', document.getElementById('theContent').value)
      postObject.append('image', document.getElementById('theFile').files[0])

    })
  }

  async componentDidMount() {
    try {
      let user = getCurrentUser()

      let lng = (user) ? user.data.location.coordinates[0] : 0
      let lat = (user) ? user.data.location.coordinates[1] : 0

      const posts = await getPosts(lat, lng)
      console.log(posts)
    }
    catch (error) {
      console.log('Ran into error trying to get posts.')
    }
  }

  render() {
    return (
      <div className="posts">
        <PostList posts={this.state.posts} />
      </div>
    )
  }
}


export default Posts