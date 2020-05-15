'use strict';

var getLocation = (function(callback){

  navigator.geolocation.getCurrentPosition((position) => {
    callback(position.coords.latitude, position.coords.longitude);
  })
  
});