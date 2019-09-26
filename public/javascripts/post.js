const publicFeed= document.getElementById('public-feed')
var div = document.getElementById('public-feed');
var div = document.getElementById('public-feed');


document.addEventListener('DOMContentLoaded', () => {
  console.log('IronGenerator JS imported successfully!');
}, false);


/**
 * Sets the publicFeed equal to that div from index
 * gets the username and message from those input forms
 * appends the publicFeed with those two things
 */

setInterval(async() => {
  let userResult = await axios.get('/api/users/me')
  console.log(userResult.data)
  // axios.get(`/api/posts/search?lat=${result.data.location[0]}&lon=${result.data.location[1]}&maxDist=100`)
  axios.get('api/posts/all')
  .then(result => {
    console.log('allmessages>>>>>>>>>>>>>', result.data)
    publicFeed.innerHTML = ''

    result.data.forEach(message => {
      publicFeed.innerHTML+=`
      <div class="messageBox">
        <h8>${userResult.data.username}: ${message.title}</h4>
        <br>
        <h8>${message.content}</h6>
        <br>
        <h8>${message.image}</h6>
      </div>
      `
    })
  }).catch(err => console.log("error getting all messages >>> ", err))
},20)

//Onclick of button called 'Bottom' the chat scrolls all the way down
function scrollDown(){
  console.log('button clicked')
  setTimeout(()=>{
    div.scrollTop = div.scrollHeight;
    console.log('GOING DOWNNNNNN')
  },100)
}

document.getElementById('theForm').onsubmit = ((e)=>{
  e.preventDefault();

  // console.log(document.getElementById('file').files[0])
=======
setInterval(async () => {
  let user = await axios.get('/api/users/me')
  axios.get('/api/posts/all')
    .then(result => {
      console.log('allmessages>>>>>>>>>>>>>', result.data)
      publicFeed.innerHTML = ''

      result.data.forEach(message => {
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

  let postObject = new FormData()
  postObject.append('title', document.getElementById('theTitle').value)
  postObject.append('content', document.getElementById('theContent').value)
  postObject.append('image', document.getElementById('file').files[0].url)

  // let postObject = {
  //   title: document.getElementById('theTitle').value,
  //   content: document.getElementById('theContent').value,
  //   image: 'TEST IMAGE URL'
  // }
  axios.post('/api/posts', postObject)
  .then((result)=>{
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
