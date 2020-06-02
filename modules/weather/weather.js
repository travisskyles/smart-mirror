'use strict'

Module.register('weather', {

  _defaults: {
    location: {
      place: null,
      lat: null,
      lon: null,
    },
    type: 'current', // current, forecast
    units: 'kelvin', //imperial, metric, default Kelvin
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
    let place = `${this.config.location.city},`;
    (this.config.location.state) ? place += `${this.config.location.state},` : place;
    place += this.config.location.country;
    
    return place;
  },

  _getForcastType: function(){
    if(this.config.type === 'current'){
      return 'weather';
    }else {
      return this.config.type;
    }
  },

  _getUnitType: function(){
    const unitType = this.config.units.toLowerCase();
    let units = {}
    switch(unitType){
      case 'imperial':
        units.temp = '&#176;F';
        units.speed = 'mph';
        break;
      case 'metric':
        units.temp = '&#176;C';
        units.speed = 'm/s';
        break;
      case '':
      case 'kelvin':
        units.temp = '&#176;K';
        units.speed = 'm/s'
    }
    return units;
  },

  _getTemplateData: async function(){
    let place = this._getPlace();
    let type = this._getForcastType();
    let units = this._getUnitType();

    return fetch(`https://api.openweathermap.org/data/2.5/${type}?q=${place}&appid=${this.config.appid}`)
      .then(response => response.json())
      .then(results => {
        let weatherData = {
          units: units,
          type: this.config.type,
          location: this.config.location,
          days: [],
        };
        switch(this.config.type){
          case 'current':
            weatherData.days.push(new WeatherDay(results, this.config.units));
            break;
          case 'forcast':
            results.list.forEach(day => {
              weatherData.days.push(new WeatherDay(day, this.config.units));
            })
            break;
        }
        console.log('weatherData', weatherData);
        return {data: weatherData};
      })
  },

})
