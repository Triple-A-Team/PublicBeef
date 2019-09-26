document.addEventListener('DOMContentLoaded', () => {

  console.log('IronGenerator JS imported successfully!');

}, false);

// import axios from 'axios';
const publicFeed = document.getElementById('public-feed')
/**
 * Sets the publicFeed equal to that div from index
 * gets the username and message from those input forms
 * appends the publicFeed with those two things
 * 
 */
setInterval(async () => {
  let user = await axios.get('/api/users/me')
  axios.get('/api/posts/all')
    .then(result => {
      console.log('allmessages>>>>>>>>>>>>>', result.data)
      publicFeed.innerHTML = ''

      result.data.forEach(message => {
        publicFeed.innerHTML += `
      <div class="messageBox">
        <h3>${message.author.username}</h3>
        <h1>${message.title}</h1>
        <br>
        <h8>${message.content}</h6>
        <br>
        <h8>${message.image}</h6>
      </div>
      `
      })

    }).catch(err => console.log("error getting all messages >>> ", err))
}, 300)

document.getElementById('theForm').onsubmit = ((e) => {
  e.preventDefault();

  let postObject = new FormData()
  postObject.append('title', document.getElementById('theTitle').value)
  postObject.append('content', document.getElementById('theContent').value)
  postObject.append('image', document.getElementById('file').files[0].url)

  axios.post('/api/posts', postObject)
    .then((result) => {
      console.log(result)
    })
})

document.querySelector('#messageSubmitButton').click(() => {
  axios.post('/api/post', { message: document.querySelector('#messageInput').value })
    .then((newMessage) => {
      document.querySelector('#messageInput').value = '';
      console.log("new message created ------ ", newMessage);
    }).catch(err => console.log("error posting message <<<< ", err))
})

