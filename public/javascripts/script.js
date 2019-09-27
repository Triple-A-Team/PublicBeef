document.addEventListener('DOMContentLoaded', () => {

  console.log('IronGenerator JS imported successfully!');

}, false);


var map, infoWindow;
var pos = {};

function updateUserLocation(pos) {
  axios.patch('/api/users/me', {
      location: {
        coordinates: [pos.lng, pos.lat]
      }
    })
    .then(result => {
      console.log(result.data)
    })

}

function getPosition() {
  pos = {
    lng: -80.196183,
    lat: 25.766111
  }
  infoWindow = new google.maps.InfoWindow

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
        pos.lat = position.coords.latitude,
          pos.lng = position.coords.longitude,
          infoWindow.setPosition(pos);
      },
      function () {
        console.log("Couldn't find posotion")
      })
  }

  return pos
}

function initMap() {

  pos = getPosition()
  map = new google.maps.Map(document.getElementById('map'), {
    center: {
      lat: pos.lat,
      lng: pos.lng
    },
    zoom: 12
  });

  //User Func
  updateUserLocation(pos);


  map.setCenter(pos);

  var circle = map.setCenter(pos);

  new google.maps.Circle({
    strokeColor: '#FF0000',
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: '#FF0000',
    fillOpacity: 0.35,
    map: map,
    center: {
      lat: pos.lat,
      lng: pos.lng
    },
    radius: 800 //Math.sqrt(citymap[city].population) * 100
  });
}