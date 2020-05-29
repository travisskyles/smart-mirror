'use strict';

const defaults = {
  port: 3000,
  modules: [
    {
      module: 'weather',
      position: 'top_right',
      config: {
        location: {
          city: '', // ex. Los Angeles
          state: '', // ex. CA
          country: '', // ex. US
        },
        type: 'current', // current, forecast,
        units: 'imperial', //imperial, metric, default: kelvin
        appid: null
      }
    },
    {
      name: 'messages',
      disabled: 'false',
      position: 'middle_third',
      config: {},
    }
  ]
}

module.exports = defaults;