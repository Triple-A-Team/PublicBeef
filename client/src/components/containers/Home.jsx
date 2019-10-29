import React from 'react'
import Posts from './Posts'
import NewPost from '../forms/NewPost'

class Home extends React.Component {
  state = {
    newGames: ""
  }

  async componentDidMount() {
  }

  render() {
    return (
      <React.Fragment>
        <div className="d-flex justify-content-between">
          <div className="col-5 mx-0 px-0">
            <div className="columns-container">
              <div className="column-title">
                <h1>Beef</h1>
                <Posts />
                <NewPost />
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    )
  }
}


export default Home