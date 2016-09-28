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
  // var marker = new google.maps.Marker({
  //   position: coords,
  //   map: this.googleMap,
  //   title: title
  //   // label: "A"
  // });
  // this.infowindow.setContent("<h2>Q. Where are you, now?</h2><h2>A. " + title + "</h2>");
  // marker.addListener('click', function() {
  //   this.infowindow.open(this.googleMap, marker);
  // }.bind(this));
  var marker = new Pin(this.googleMap, coords, title);
}

function Map (container) {
  this.googleMap = new google.maps.Map(container, {
    center: new google.maps.LatLng(0, 150.644),
    zoom: 1,
    minZoom: 1
  });
  this.labelCounter = 0;
  // this.infowindow = new google.maps.InfoWindow();

  // this.addClickEvent = function() {
  //   google.maps.event.addListener(this.googleMap, 'click',
  //     function(event) {
  //       console.log(event);

  //       var position = { lat: event.latLng.lat(), lng: event.latLng.lng() };
  //       this.addMarker(position);
  //     }.bind(this))
  // }
}