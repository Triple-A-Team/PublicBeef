import React from 'react'
import { Jumbotron } from 'react-bootstrap'
import ChatList from '../presentational/ChatList'
import { getChats } from '../../api/messages'
import { isLoggedIn } from '../../api/users'

class Chats extends React.Component {
  state = {
    chats: [],
    loggedIn: false
  }

  async componentDidMount() {
    if (isLoggedIn()) {
      const chats = await getChats()
      this.setState({
        chats,
        loggedIn: true
      })
    }
  }

  render() {
    return (
      <React.Fragment>
        {this.state.loggedIn ? <ChatList chats={this.state.chats} /> : <Jumbotron style={{ textAlign: 'center', height: '100%' }}><h1>Must Log in to use this feature.</h1></Jumbotron>}
      </React.Fragment>
    )
  }
}


export default Chats