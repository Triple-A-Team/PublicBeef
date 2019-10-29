import React from 'react'
import ChatList from '../presentational/ChatList'
import { getChats } from '../../api/messages'

class Chats extends React.Component {
  state = {
    chats: []
  }

  async componentDidMount() {
    const chats = await getChats()
    this.setState({ chats })
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