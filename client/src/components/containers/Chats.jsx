import React from 'react'
import ChatList from '../presentational/ChatList'
import { getChats } from '../../api/messages'

class Chats extends React.Component {
  state = {
    chats: []
  }

  async componentDidMount() {
    try {
      const chats = await getChats()
      console.log('got chats', chats)
      this.setState({ chats })
    }
    catch (error) {
      console.log('Ran into error trying to get chats.')
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