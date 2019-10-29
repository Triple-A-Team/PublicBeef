import React from 'react'
import Posts from './Posts'

class Home extends React.Component {
  state = {
    newGames: ""
  }

  async componentDidMount() {
  }

  render() {
    return (
      <React.Fragment>
        <Posts />
      </React.Fragment>
    )
  }
}


export default Home