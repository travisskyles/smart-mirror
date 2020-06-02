'use strict';

var WeatherDay = class {
  constructor(weatherObj, units){
    this.temp = Math.round(this.convertTemp(weatherObj.main.temp, units));
    this.pressure = weatherObj.main.pressure;
    this.humidity = weatherObj.main.humidity;
    this.highTemp = Math.round(this.convertTemp(weatherObj.main.temp_max, units));
    this.lowTemp = Math.round(this.convertTemp(weatherObj.main.temp_min, units));
    this.feelsLike = Math.round(this.convertTemp(weatherObj.main.feels_like, units));
    this.windSpeed = Math.round(this.convertSpeed(weatherObj.wind.speed, units)) || 'N/A';
    this.windDirection = weatherHelper.degToCompass(weatherObj.wind.deg) || 'N/A';
    this.icon = weatherObj.weather[0].id;
    this.description = weatherObj.weather[0].description;
    this.time = moment.unix(weatherObj.dt).format('LT');
  }

  convertTemp(temp, units){
    units = units.toLowerCase();
    switch(units){
      case 'imperial':
        return weatherHelper.kelvinToFahr(temp);
      case 'metric':
        return weatherHelper.kelvinToCel(temp);
      case 'kelvin':
      case (!units):
        return temp;
    }
  }

  convertSpeed(speed, units){
    units = units.toLowerCase();
    if(units === 'imperial'){
      return speed * 2.237;
    }
  }
}
