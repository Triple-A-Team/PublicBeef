import React from 'react'
import ChatCard from './ChatCard'
import Chat from './Chat'
import { Button, ListGroup } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'

const ChatList = ({ chats }) => {
  const [selectedChat, setSelectedChat] = React.useState(null)

  const updateScrollHeight = () => {
    const chatListUL = document.getElementById('chatList');
    if (chatListUL) chatListUL.scrollTop = chatListUL.scrollHeight;
  }

  React.useEffect(() => {
    updateScrollHeight()
    window.addEventListener("resize", updateScrollHeight);
  }, [chats]);

  return (
    <React.Fragment>
      {
        selectedChat ?
          (< React.Fragment >
            <Button onClick={() => setSelectedChat(null)}><FontAwesomeIcon icon={faArrowLeft} /></Button>
            <Chat key={selectedChat._id} chat={selectedChat} />
          </React.Fragment>) :
          (
            <ListGroup id="chatList" variant="flush">
              {chats.map(chat => <ChatCard key={chat._id} chat={chat} onSelect={setSelectedChat} />)}
            </ListGroup>)
      }
    </React.Fragment >
  )
}

export default ChatList