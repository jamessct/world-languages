function CountryInfo() {
  this._countries = null;

  this.requestInfo = function(url){
    this._countries = null;
    var request = new XMLHttpRequest();
    request.open("GET", url);
    request.onload = function() {
      if (request.status !== 200) return;
      this._countries = JSON.parse(request.responseText);
    }.bind(this);
    request.send();
  }

  this.filter = function(filterLanguage) {
    if (this._countries === null) return null;
    return this._countries.filter(function(country) {
      for(var language of country.languages) {
        if(filterLanguage === language) return true;
      }
      return false;
    });
  }
}