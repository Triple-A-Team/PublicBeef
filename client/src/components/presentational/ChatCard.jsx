import React from 'react'
import { Card } from 'react-bootstrap'

const ChatCard = ({ chat, onSelect }) => {
  return (
    <Card>
      <Card.Link onClick={() => onSelect(chat)}>
        <Card.Body>
          <Card.Title>{chat.name}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">{'# Messages: ' + chat.messages.length}</Card.Subtitle>
          <Card.Text>
            {chat.users.reduce((text, user) => `${user.username}, ${text}`, '')}
          </Card.Text>
        </Card.Body>
      </Card.Link>
      <Card.Footer className="text-muted">{'Last message at: ' + chat.messages[chat.messages.length - 1].created_at}</Card.Footer>
    </Card >
  )
}

export default ChatCard