import React from 'react'
import PostList from '../presentational/PostList'
import { getPosts } from '../../api/posts'
import { getCurrentUser, isLoggedIn } from '../../api/users'
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
      let lat = 25.766111
      let lng = -80.196183
      if (isLoggedIn()) {
        let user = await getCurrentUser()
        try {
          lat = user.location.coordinates[0]
          lng = user.location.coordinates[1]
        } catch (error) {
          console.log('User has no lat/long data...skipping.')
        }
      }

      const posts = await getPosts(lat, lng)
      this.setState({ posts })
    }
    catch (error) {
      console.log('Ran into error trying to get posts: ', error)
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