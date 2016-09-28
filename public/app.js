// var apiKey = "AIzaSyBKeLQd10bCTyJe2gtG7pn7hmSp7ceYmG0"

var initialise = function() {
  var container = document.getElementById('map');
  coords = { lat: 40.712784, lng: -74.005941 };
  var map = new Map(container, coords, 10);
  map.addMarker(coords, "New York");

  var geocoder = new google.maps.Geocoder();

  var submitButton = document.querySelector('#submit');
  submitButton.onclick = function() {
    var address = document.querySelector('#address');
    map.geocodeAddress(geocoder, address.value);
    address.value = "";
  };
  // map.addClickEvent();
}

window.onload = initialise;