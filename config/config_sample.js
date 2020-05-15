var sample_config = {
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
        appid: 'sample_',
      },
    },
  ],
}
