function Pin (map, coords, title) {
  this.marker = new google.maps.Marker({
    position: coords,
    map: map,
    title: title
  });
  this.infowindow = new google.maps.InfoWindow({
    content: "<h2>This is " + title + "</h2>"
  });
  this.marker.addListener('click', function() {
    this.infowindow.open(map, this.marker);
  }.bind(this));
}

Map.prototype.addMarker = function(coords, title) {
  var marker = new Pin(this.googleMap, coords, title);
}

function Map (container) {
  this.googleMap = new google.maps.Map(container, {
    center: new google.maps.LatLng(0, 150.644),
    zoom: 1,
    minZoom: 1
  });
}