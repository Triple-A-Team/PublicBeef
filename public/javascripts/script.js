document.addEventListener('DOMContentLoaded', () => {

  console.log('IronGenerator JS imported successfully!');

}, false);




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
          zoom: 17,
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
            radius: 50 //Math.sqrt(citymap[city].population) * 100
              
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