import React from 'react'
import { Media } from 'react-bootstrap'

const Chat = ({ chat }) => {
  return (
    <Media as="li">
      <h5>{chat.name}</h5>
      <Media.Body>
        <p>{chat.users.reduce((text, user) => `${user.username}, ${text}`, '')}</p>
        <p>{chat.messages.length}</p>
        <p>{chat.messages[chat.messages.length-1].createdAt}</p>
        
      </Media.Body>
    </Media>
  )
}

export default Chat