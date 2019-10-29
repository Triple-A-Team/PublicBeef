import React from 'react'
import { Media } from 'react-bootstrap'

const Chat = ({ chat }) => {
  return (
    <Media as="li">
      <h5>{chat.name}</h5>
      <Media.Body>
        <p>{chat.users.reduce((text, user) => `${text}, ${user.name}`, '')}</p>
      </Media.Body>
    </Media>
  )
}

export default Chat