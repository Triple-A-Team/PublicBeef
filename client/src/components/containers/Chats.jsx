import React from 'react'
import ChatList from '../presentational/ChatList'
import { getChats } from '../../api/messages'
import { isLoggedIn } from '../../api/users'

class Chats extends React.Component {
  state = {
    chats: []
  }

  async componentDidMount() {
    if (isLoggedIn()) {
      const chats = await getChats()
      this.setState({ chats })
    }
  }

  render() {
    return (
      <div className="chats">
        <ChatList chats={this.state.chats} />
      </div>
    )
  }
}


export default Chats