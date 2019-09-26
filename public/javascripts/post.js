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
      <div class="message-box">
      <h1>${message.title}</h1>
        <p><span style="font-weight:bold;">author:</span>${message.author.username}</p>
        <br>
        <p>${message.content}</p>
        <br>
        <img src="${message.image}" height="100px" width="100px">
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
  postObject.append('image', document.getElementById('theFile').files[0])

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

