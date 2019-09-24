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
  axios.get('/message/all')
  .then(allMessages => {
    publicFeed.innerHTML = ''

    allMessages.forEach(oneMessage => {
      publicFeed.innerHTML.append(`
      <div class="messageBox">
        <h4>${oneMeesage.username}</h4>
        <h6>${oneMessage.message}</h6>
      </div>
      `)
    })

  }).catch(err => console.log("error getting all messages >>> ", err))
},1000)


document.querySelector('#messageSubmitButton').click(() => {
  axios.post('/post/add', {message: document.querySelector('#messageInput').value})
  .then((newMessage)=>{
    document.querySelector('#messageInput').value = '';
    console.log("new message created ------ ", newMessage);
  }).catch(err => console.log("error posting message <<<< ", err))
})

//************START GOOGLE MAPS CODE************

//Object of locations
var locations={
  building:{
    center: {
      lat: 25.766675,
      lng: -80.196130  
    }
  }
  }

// Initialize and add the map
function initMap() {

  var map = new google.maps.Map(
      document.getElementById('map'), {
          zoom: 16,
          center: {lat: 25.766675, lng:-80.196130}
      });

        // Construct the circle for each value in citymap.
        // Note: We scale the area of the circle based on the population.
        for (var city in locations) {
          // Add the circle for this city to the map.
          var cityCircle = new google.maps.Circle({
            strokeColor: '#FF0000',
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: '#FF0000',
            fillOpacity: 0.35,
            map: map,
            center: {lat: 25.766675, lng:-80.196130},
            radius: 80 //Math.sqrt(citymap[city].population) * 100
              
          });
        }

  // The marker, positioned at park
  var marker = new google.maps.Marker({
      position: building,
      map: map
  });
  //To make multiple markers
  // var marker2 = new google.maps.Marker({
  //     position: lake,
  //     map: map
  // });

}
////************END OF GOOGLE MAPS CODE//************