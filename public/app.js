// var apiKey = "AIzaSyBKeLQd10bCTyJe2gtG7pn7hmSp7ceYmG0"
var allCountries;
var selectedCountries;
var map;

var sortList = function() {
  var dropdownList = document.querySelector('select');
  var countriesString = new Array();

  for(i = 1; i < dropdownList.length; i++) {
    countriesString[i-1] =
      dropdownList.options[i].text + "," +
      dropdownList.options[i].value + "," +
      dropdownList.options[i].selected;
  }

  countriesString.sort();

  for(i = 1; i < dropdownList.length; i++) {
    var parts = countriesString[i-1].split(',');

    dropdownList.options[i].text = parts[0];
    dropdownList.options[i].value = parts[1];

    if(parts[2] == "true") {
      dropdownList.options[i].selected = true;
    }
    else {
      dropdownList.options[i].selected = false;
    }
  }
}

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

  sortList();

  var languages = document.querySelector('select');
  languages.onchange = getCountriesByLanguage;

  initMap();
}

window.onload = initialise;