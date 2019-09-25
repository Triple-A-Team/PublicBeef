document.addEventListener('DOMContentLoaded', () => {

  console.log('IronGenerator JS imported successfully!');

}, false);


//*****************Axios Code */

import axios from 'axios';
const publicFeed= document.getElementById('public-feed')
/**
 * Sets the publicFeed equal to that div from index
 * gets the username and message from those input forms
 * appends the publicFeed with those two things
 * 
 */
setInterval(() => {
  axios.get('/api/posts/all')
  .then(allMessages => {
    publicFeed.innerHTML = ''

    allMessages.forEach(oneMessage => {
      publicFeed.innerHTML.append(`
      <div class="messageBox">
        <h4>${oneMessage.title}</h4>
        <h6>${oneMessage.content}</h6>

        <h6>${oneMessage.req.user}</h6>
      </div>
      `)
    })

  }).catch(err => console.log("error getting all messages >>> ", err))
},1000)


document.querySelector('#messageSubmitButton').click(() => {
  axios.post('/api/post', {message: document.querySelector('#messageInput').value})
  .then((newMessage)=>{
    document.querySelector('#messageInput').value = '';
    console.log("new message created ------ ", newMessage);
  }).catch(err => console.log("error posting message <<<< ", err))
})

