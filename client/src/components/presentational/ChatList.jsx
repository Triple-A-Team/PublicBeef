import React from 'react'
import Chat from './Chat'

const ChatList = ({ chats }) => {
  console.log(chats, chats.map)
  return (
    <ul className="list-unstyled">
      {chats.map(chat => <Chat key={chat._id} chat={chat} />)}
    </ul>
  )
}

export default ChatList