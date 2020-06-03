'use strict';

var WeatherDay = class {
  constructor(forecastData){
    this.temp = Math.round(forecastData.temp);
    this.pressure = forecastData.pres;
    this.humidity = forecastData.rh;
    this.percentPrecip = forecastData.pop;
    this.highTemp = Math.round(forecastData.high_temp);
    this.lowTemp = Math.round(forecastData.low_temp);
    this.feelsLike = Math.round(forecastData.app_temp);
    this.windSpeed = Math.round(forecastData.wind_spd) || 'N/A';
    this.windDirection = forecastData.wind_cdir || 'N/A';
    this.icon = forecastData.weather.code;
    this.description = forecastData.weather.description;
    this.time = moment.unix(forecastData.ts).format('LT');
    this.date = forecastData.valid_date;
    this.day = moment(this.date).format('dddd').slice(0, 3);
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
    return speed;
  }
}
