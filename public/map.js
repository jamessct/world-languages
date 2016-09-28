function Pin (map, coords, title, label) {
  this.marker = new google.maps.Marker({
    position: coords,
    map: map,
    title: title,
    label: label
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
  var label = String.fromCharCode('A'.charCodeAt() + (this.labelCounter++ % 26));
  var marker = new Pin(this.googleMap, coords, title, label);
}

Map.prototype.geocodeAddress = function(geocoder, address) {
  geocoder.geocode({'address': address}, function(results, status) {
    if (status === 'OK') {
      this.googleMap.setCenter(results[0].geometry.location);
      this.addMarker(results[0].geometry.location, address);
    } else {
      alert('Geocode failed: ' + status);
    }
  }.bind(this));
}

function Map (container, coords, zoom) {
  this.googleMap = new google.maps.Map(container, {
    center: coords,
    zoom: zoom
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