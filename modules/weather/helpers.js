'use strict';

var degToCompass = function(num) {
  var val = Math.floor((num / 22.5) + 0.5);
  var arr = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];
  return arr[(val % 16)];
}

var kelvinToFahr = function(deg){
  let f = deg * (9/5) - 459.67;
  return f;
}