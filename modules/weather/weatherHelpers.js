'use strict';

var weatherHelper = {

  degToCompass: function(num) {
    let val = Math.floor((num / 22.5) + 0.5);
    const arr = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];
    return arr[(val % 16)];
  },

  kelvinToFahr: function(degK){
    let f = degK * (9/5) - 459.67;
    return f;
  },

  kelvinToCel: function(degK){
    let c = degK - 273.15;
    return c;
  },
}