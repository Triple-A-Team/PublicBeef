document.addEventListener('DOMContentLoaded', () => {

  console.log('IronGenerator JS imported successfully!');

}, false);



//************START GOOGLE MAPS CODE************

//Object of locations
// var locations={
//   building:{
//     center: {
//       lat: 25.766675,
//       lng: -80.196130  
//     }
//   }
//   }

// // Initialize and add the map
// function initMap() {

//   var map = new google.maps.Map(
//       document.getElementById('map'), {
//           zoom: 16,
//           center: {lat: 25.766675, lng:-80.196130}

//       });
//         // Construct the circle for each value in citymap.
//         // Note: We scale the area of the circle based on the population.
//         for (var city in locations) {
//           // Add the circle for this city to the map.
//           var cityCircle = new google.maps.Circle({
//             strokeColor: '#FF0000',
//             strokeOpacity: 0.8,
//             strokeWeight: 2,
//             fillColor: '#FF0000',
//             fillOpacity: 0.35,
//             map: map,
//             center: {lat: 25.766675, lng:-80.196130},
//             radius: 80 //Math.sqrt(citymap[city].population) * 100

//           });
//         }

//   // The marker, positioned at park
//   var marker = new google.maps.Marker({
//       position: building,
//       map: map
//   });
//   //To make multiple markers
//   // var marker2 = new google.maps.Marker({
//   //     position: lake,
//   //     map: map
//   // });

// }

////************END OF GOOGLE MAPS CODE//************

var map, infoWindow;
var pos = {};

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: { lat: pos.lat, lng: pos.lng },
    zoom: 8
    });
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
        pos.lat = position.coords.latitude, 
        pos.lng = position.coords.longitude,
        console.log(pos)
        
        infoWindow.setPosition(pos);
        infoWindow.setContent('Location found.');
        infoWindow.open(map);
        map.setCenter(pos);
      }, function () {
        handleLocationError(true, infoWindow, map.getCenter());
      });
    } else {
      // Browser doesn't support Geolocation
      handleLocationError(false, infoWindow, map.getCenter());
    }
  infoWindow = new google.maps.InfoWindow;
  console.log(pos, 'ajsigjaw')

  // Try HTML5 geolocation.
  // for (var city in locations) {
  //   // Add the circle for this city to the map.
  //   var cityCircle = new google.maps.Circle({
  //     strokeColor: '#FF0000',
  //     strokeOpacity: 0.8,
  //     strokeWeight: 2,
  //     fillColor: '#FF0000',
  //     fillOpacity: 0.35,
  //     map: map,
  //     center: { lat: 25.766675, lng: -80.196130 },
  //     radius: 80 //Math.sqrt(citymap[city].population) * 100

  //   });
  //   var marker = new google.maps.Marker({
  //     position: pos,
  //     map: map
  //   });
  // }

  function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
      'Error: The Geolocation service failed.' :
      'Error: Your browser doesn\'t support geolocation.');
    infoWindow.open(map);
  }
}