document.addEventListener('DOMContentLoaded', () => {
  console.log('Welcome to Beef!')
}, false);

/**
 * Sets the publicFeed equal to that div from index
 * gets the username and message from those input forms
 * appends the publicFeed with those two things
 */
const publicFeed = document.getElementById('public-feed')
var div = document.getElementById('public-feed');

setInterval(async () => {

  let user = await axios.get('/api/users/me')

  let userLNG = 0
  let userLAT = 0

  if (user) {
    userLNG = user.data.location.coordinates[0]
    userLAT = user.data.location.coordinates[1]
  }

  axios.get(`/api/posts/search?lat=${userLAT}&lon=${userLNG}&maxDist=500`)
  .then(result => {
    publicFeed.innerHTML = ''
    result.data.forEach(message => {
      console.log(message)
        if (!message.image) {
          publicFeed.innerHTML += `
      <div class="posts-box d-flex justify-content-around align-items-center">
        <div class="col-9"> 
          <div class="row">
            <h1>${message.title}</h1>
          </div>
          <div class="row">   
            <p>${message.content}</p>
          </div>
        </div>
        <div class="col">
          <p><span style="font-weight:bold;">Beefer:</span>${message.author.username}</p>
        </div>
      </div >`
    }
    else if (message.image) {
          console.log(message.author)
          publicFeed.innerHTML += `
      <div class="posts-box d-flex justify-content-around align-items-center">
        <div class="col-6"> 
          <div class="row">   
            <h1>${message.title}</h1>
          </div>
          <div class="row">   
            <p>${message.content}</p>
          </div>
        </div>
        <div class="col-3">
          <p><span style="font-weight:bold;">Beefer:</span>${message.author.username}</p>
        </div>
        <div class="col-3 d-flex">
          <img src="${message.image}" height="90px" width="90px;">
        </div>
      </div>`
        }
      })

    }).catch(err => console.log("error getting all messages >>> ", err))
}, 500)

document.getElementById('theForm').onsubmit = ((e) => {
  e.preventDefault();

  let postObject = new FormData()
  postObject.append('title', document.getElementById('theTitle').value)
  postObject.append('content', document.getElementById('theContent').value)
  postObject.append('image', document.getElementById('theFile').files[0])

  axios.post('/api/posts', postObject)
    .then((result) => {
      console.log('GETTING ALL USER POSTS=====', result)
    })
})
document.querySelector('#messageSubmitButton').click(() => {
  axios.post('/api/post', { message: document.querySelector('#messageInput').value })
    .then((newMessage) => {
      document.querySelector('#messageInput').value = '';
      console.log("new message created ------ ", newMessage);
    }).catch(err => console.log("error posting message <<<< ", err))
})
