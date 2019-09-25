document.addEventListener('DOMContentLoaded', () => {

  console.log('IronGenerator JS imported successfully!');

}, false);

var map, infoWindow;
var pos = {};

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: { lat: pos.lat, lng: pos.lng },
    zoom: 16
  });
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
      pos.lat = position.coords.latitude,
      pos.lng = position.coords.longitude,
        infoWindow.setPosition(pos);
        infoWindow.setContent('Location found.');
        infoWindow.open(map);
        map.setCenter(pos);
        
        var cityCircle = new google.maps.Circle({
          strokeColor: '#FF0000',
          strokeOpacity: 0.8,
          strokeWeight: 2,
          fillColor: '#FF0000',
          fillOpacity: 0.35,
          map: map,
          center: { lat: pos.lat, lng: pos.lng },
          radius: 80 //Math.sqrt(citymap[city].population) * 100
        });
      }, function () {
        handleLocationError(true, infoWindow, map.getCenter());
      });
    } else {
      // Browser doesn't support Geolocation
      handleLocationError(false, infoWindow, map.getCenter());
    }
    
    infoWindow = new google.maps.InfoWindow;
    
    function handleLocationError(browserHasGeolocation, infoWindow, pos) {
      infoWindow.setPosition(pos);
      infoWindow.setContent(browserHasGeolocation ?
        'Error: The Geolocation service failed.' :
        'Error: Your browser doesn\'t support geolocation.');
        infoWindow.open(map);
      }
}
