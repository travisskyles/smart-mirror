// require('dotenv').config();

var config = {
  modules: [
    {
      name: 'weather',
      position: 'top_right',
      config: {
        location: {
          place: 'Beaverton, OR',
          lat: '45.4889',
          lon: '-122.8014',
          // lat: null,
          // lon: null,
        },
        type: 'current', // current, forecast
        units: 'imperial', //imperial, metric
        appid: '2dc15ae20faf5befed635b49ac81fc15',
      },
    },
  ],
}
