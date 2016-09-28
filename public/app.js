// var apiKey = "AIzaSyBKeLQd10bCTyJe2gtG7pn7hmSp7ceYmG0"
var allCountries;
var selectedCountries;
var map;

var initMap = function() {
  var container = document.getElementById('map');
  map = new Map(container);

  // map.addClickEvent();
}

var getAllCountries = function(){
  if (this.status !== 200) return;
  allCountries = JSON.parse(this.responseText);
}

var makeRequest = function(url, callback){
  var request = new XMLHttpRequest();
  request.open("GET", url);
  request.onload = callback;
  request.send();
}

var getCountriesByLanguage = function() {
  selectedCountries = _.filter(allCountries, function(country) {
    for(var language of country.languages) {
      if(this.value === language) return true;
    }
    return false;
  }.bind(this));
  initMap();
  _.forEach(selectedCountries, function(country) {
      map.addMarker(new google.maps.LatLng(country.latlng[0], country.latlng[1]), country.name);
  })
}

var initialise = function() {
  var url = "http://localhost:5000";
  makeRequest(url, getAllCountries);

  var languages = document.querySelector('select');
  languages.onchange = getCountriesByLanguage;

  initMap();
}

window.onload = initialise;