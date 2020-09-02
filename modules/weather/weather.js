'use strict'

Module.register('weather', {

  _defaults: {
    updateInterval: 1000 * 3600,
    location: {
      place: null,
      lat: null,
      lon: null,
    },
    type: 'current', // current, forecast, default: current
    forecastDays: 5, // numbers of days to display for forecast
    units: 'metric', //imperial,  kelvin, default: metric
    appid: '',
  },

  _getStyles: function(){
    return [
      'css/weather.css',
      'https://cdnjs.cloudflare.com/ajax/libs/weather-icons/2.0.9/css/weather-icons.min.css',
    ]
  },

  _getScripts: function(){
    return [
      'weatherHelpers.js',
      dependencies['ejs'],
      dependencies['moment'],
      'weatherDay.js',
    ]
  },

  _getPlace: function(){
    let place = `${this.data.config.location.city},`;
    (this.data.config.location.state) ? place += `${this.data.config.location.state},` : place;
    place += this.data.config.location.country;

    return place;
  },

  _getForcastType: function(){
    if(this.data.config.type === 'current'){
      return 'current';
    }
    if(this.data.config.type === 'forcast'){
      return 'forecast/daily';
    }
  },

  _getUnitType: function(){
    const unitType = this.data.config.units.toLowerCase();
    let units = {}
    switch(unitType){
      case 'imperial':
        units.api = 'I',
        units.temp = '&#176;F';
        units.speed = 'mph';
        break;
      case '':
      case 'metric':
        units.api = 'M',
        units.temp = '&#176;C';
        units.speed = 'm/s';
        break;
      case 'kelvin':
        units.api = 'K',
        units.temp = '&#176;K';
        units.speed = 'm/s'
    }
    return units;
  },

  _getTemplateData: async function(){
    let place = this._getPlace();
    let units = this._getUnitType();
    let weatherData = {
      units: units,
      type: this.data.config.type,
      location: this.data.config.location,
      current: [],
      forecast: [],
    };
    const fetchData = { units: units.api, place: place };
    console.log(fetchData);
    switch(this.data.config.type){
      
      case 'current':
        await Promise.all([
          // fetch(`https://api.weatherbit.io/v2.0/current?key=2f80f1fe90d045cb8d63a25a41176e47&units=${units.api}&city=${place}`)
          //   .then(response => response.json())
          //   .then(results => {
          //     weatherData.current.push(new WeatherDay(results.data[0]));
          //   }),
          // fetch(`https://api.weatherbit.io/v2.0/forecast/daily?key=2f80f1fe90d045cb8d63a25a41176e47&units=${units.api}&city=${place}`)
          // .then(response => response.json())
          // .then(results => {
          //   weatherData.forecast.push(new WeatherDay(results.data[0]));
          // })
          

          fetch(`http://127.0.0.1:3001/weather`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(fetchData),
          })
            .then(results => {
              return results.text()
            })
            .then(data => console.log(data))
        ])
        return { data: weatherData }

      case 'forecast':
        return fetch(`https://api.weatherbit.io/v2.0/forecast/daily?key=2f80f1fe90d045cb8d63a25a41176e47&units=${units.api}&city=${place}`)
          .then(response => response.json())
          .then(results => {
            for(let i = 0; i < this.data.config.forecastDays; i++){
              weatherData.forecast.push(new WeatherDay(results.data[i]));
            }
            return { data: weatherData };
        })
    }
  },

})
