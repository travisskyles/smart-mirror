var sample_config = {
  port: 3000,
  modules: [
    {
      name: 'weather',
      disabled: 'false',
      position: 'top_right',
      config: {
        location: {
          city: 'Beaverton',
          state: 'OR',
          country: 'US',
        },
        type: 'current', // current, forecast
        units: 'imperial', //imperial, metric
        appid: 'api_key_here', // open weather api key
      },
    },
    {
      name: 'helloWorld',
      disabled: 'false',
      position: 'middle_third',
      config: {},
    },
  ],
}
