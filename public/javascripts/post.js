document.addEventListener('DOMContentLoaded', () => {

  console.log('IronGenerator JS imported successfully!');

}, false);


//*****************Axios Code */

// import axios from 'axios';
const publicFeed= document.getElementById('public-feed')
/**
 * Sets the publicFeed equal to that div from index
 * gets the username and message from those input forms
 * appends the publicFeed with those two things
 * 
 */
console.log("ABOUT TO RUN SET INTERVAL")
setInterval(() => {

  axios.get('/api/posts/all')
  .then(result => {
    console.log('allmessages>>>>>>>>>>>>>', result.data)
    publicFeed.innerHTML = ''

    result.data.forEach(message => {
      publicFeed.innerHTML+=`
      <div class="messageBox">
      
        <h8>${message.title}</h4>
        <br>
        <h8>${message.content}</h6>
        <br>
        <h8>${message.image}</h6>
      </div>
      `
    })

  }).catch(err => console.log("error getting all messages >>> ", err))
},300)


document.querySelector('#messageSubmitButton').click(() => {
  axios.post('/api/post', {message: document.querySelector('#messageInput').value})
  .then((newMessage)=>{
    document.querySelector('#messageInput').value = '';
    console.log("new message created ------ ", newMessage);
  }).catch(err => console.log("error posting message <<<< ", err))
})

