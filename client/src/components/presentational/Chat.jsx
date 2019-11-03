import React from 'react'
import moment from 'moment';
import { Card, Image, ListGroup, Button } from 'react-bootstrap'

const Chat = ({ chat }) => {

  const updateScrollHeight = () => {
    const chatUL = document.getElementById('selectedChat');
    if (chatUL) chatUL.scrollTop = chatUL.scrollHeight;
  }

  React.useEffect(() => {
    updateScrollHeight()
    window.addEventListener("resize", updateScrollHeight);
  }, [chat]);

  return (
    <ListGroup id="selectedChat" className="list-unstyled pl-3" style={{ maxHeight: '80vh', overflowY: 'auto', WebkitOverflowScrolling: 'touch' }} >
      <li>
        <Card>
          <Card.Body>
            <Card.Title>{chat.name}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">{chat.users.reduce((text, user) => `${user.username}, ${text}`, '')}</Card.Subtitle>
          </Card.Body>
        </Card >
      </li>
      {chat.messages.map(message => <ChatMessage key={message.author._id + message.created_at} message={message} />)}
      <li>
        <div className="form-group basic-textarea">
          <textarea className="form-control pl-2 my-0" id="exampleFormControlTextarea2" rows="3" placeholder="Type your message here..." />
          <Button color="info" size="sm" className="float-right mt-4">Send</Button>
        </div>
      </li>
    </ListGroup>
  )
}


const ChatMessage = ({ message }) => {
  let { author, created_at, content } = message
  var messageTimeStamp = moment(created_at)
  return (
    <li className="chat-message d-flex mb-2">
      <Image tag="img" src={author.avatar || "https://via.placeholder.com/80x80text=User+Avatar"} alt="avatar" roundedCircle style={{ maxHeight: '80px', maxWidth: '80px' }} className="mx-1 z-depth-1" />
      <Card>
        <Card.Body>
          <div>
            <strong className="primary-font">{'@' + author.nickname}</strong>{` (${author.username}) `}
            <small className="pull-right text-muted">
              <i className="far fa-clock" /> {messageTimeStamp.toNow(true) + ' ago'}
            </small>
          </div>
          <hr />
          <p className="mb-0">{content}</p>
        </Card.Body>
      </Card>
    </li>
  )
}



export default Chat