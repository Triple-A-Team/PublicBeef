import React, { useEffect } from 'react';
import Comment from './Comment'
import { ListGroup, Card, Accordion, Button } from 'react-bootstrap'


const CommentList = ({ postId, comments }) => {
  const updateScrollHeight = () => {
    const commentListUL = document.getElementById('commentList');
    commentListUL.scrollTop = commentListUL.scrollHeight;
  }

  useEffect(() => {
    updateScrollHeight()
    window.addEventListener("resize", updateScrollHeight);
  }, [comments]);

  return (
    <Card>
      <Accordion>
          <Accordion.Toggle as={Button} variant="link" eventKey={postId}>Comments</Accordion.Toggle>
        <Accordion.Collapse eventKey={postId}>
          <Card.Body>
            <ListGroup id="commentList" style={{ overflowY: 'auto', WebkitOverflowScrolling: 'touch' }} variant="flush">
              {comments.map(comment => <Comment key={comment._id} comment={comment} />)}
            </ListGroup>
          </Card.Body>
        </Accordion.Collapse>
      </Accordion>
    </Card>
  )
}

export default CommentList