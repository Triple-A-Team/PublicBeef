document.addEventListener('DOMContentLoaded', () => {

  console.log('IronGenerator JS imported successfully!');

}, false);

// Initialize and add the map
function initMap() {
  // The location of Building Co
  var building = {
      lat: 25.766675,
      lng: -80.196130

       
  };
  // var lake = {
  //     lat: 25.719614,
  //     lng: -80.369308
  // };

  // The map, centered at Tropical Park
  var map = new google.maps.Map(
      document.getElementById('map'), {
          zoom: 11,
          center: building
      });
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