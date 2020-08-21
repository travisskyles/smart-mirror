'use strict';


let config = {
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
        appId: '',
      },
    },
    {
      name: 'news_rss',
      disabled: 'false',
      position: 'bottom_middle',
      config: {
        url: 'https://rss.nytimes.com/services/xml/rss/nyt/HomePage.xml',
        type: 'scrolling', // scrolling or descriptive
      }
    },
    {
      name: 'messages',
      disabled: 'false',
      position: 'upper_third',
      config: {
        appId: '',
      },
    },
    {
      name: 'time_date',
      disabled: 'false',
      position: 'top_left',
      config: {},
    },
  ],
}

// module.exports = config;