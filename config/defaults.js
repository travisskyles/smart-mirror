'use strict';

const defaults = {
  port: 3000,
  modules: [
    {
      module: 'weather',
      position: 'top_right',
      config: {
        location: {
          place: null,
          lat: null,
          lon: null,
        },
        type: 'current', // current, forecast,
        units: 'imperial', //imperial, metric, default: kelvin
        appid: null
      }
    }
  ]
}

module.exports = defaults;