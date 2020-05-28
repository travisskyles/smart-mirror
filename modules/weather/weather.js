'use strict'

Module.register('weather', {

  _defaults: {
    location: {
      place: null,
      lat: null,
      lon: null,
    },
    type: 'current', // current, forecast
    units: '', //imperial, metric, default Kelvin
    appid: '',
  },

  _getStyles: function(){
    return [
      'css/weather.css',
    ]
  },

  _getScripts: function(){
    return [
      'helpers.js'
    ]
  },

  _getPlace: function(){
    let place = `${moduleData.location.city},`;
    (moduleData.location.state) ? place += `${moduleData.location.state},` : place;
    place += moduleData.location.country;
    
    return place;
  },

  _getWeatherCurrent: async function (){

    let place = getPlace();

    return fetch(`https://api.openweathermap.org/data/2.5/weather?q=${place}&appid=${moduleData.appid}`)
      .then(response => response.json())
      .then(results => {
        console.log('results',results)

        const weatherObj = {
          time: moment.unix(results.dt).format('LT'),
          location: results.name,
          icon: results.weather[0].id,
          description: results.weather[0].description,
          temp: {
            current: Math.round(kelvinToFahr(results.main.temp)),
            high: Math.round(kelvinToFahr(results.main.temp_max)),
            low: Math.round(kelvinToFahr(results.main.temp_min)),
            feels_like: Math.round(kelvinToFahr(results.main.feels_like)),
          },
          wind: {
            speed: results.wind.speed,
            direction: (results.wind.deg)? degToCompass(results.wind.deg) : 'N/A',
          },
          humidity: results.main.humidity,
        }

        return weatherObj;
      })
  },

  _createDomCurrent: function(weatherData, configData){

    const moduleLocation = document.getElementsByClassName('container weather_module')

    const wrapper = document.createElement('div')
      wrapper.id = 'weather_wrapper';
    const leftWrapper = document.createElement('div')
      leftWrapper.id = 'weather_leftWrapper';
    const rightWrapper = document.createElement('div')
      rightWrapper.id = 'weather_rightWrapper';

    moduleLocation[0].appendChild(wrapper)
    wrapper.append(leftWrapper, rightWrapper)

    // left wrapper
    const icon = document.createElement('i');
      icon.classList.add('wi', `wi-owm-${weatherData.icon}`);
      icon.id = 'weather_icon';
      leftWrapper.appendChild(icon);

    // temp
    const tempWrapper = document.createElement('div')
      tempWrapper.id = 'weather_tempWrapper';

    const temp = document.createElement('span')
      temp.id = 'weather_temp'
      temp.innerHTML = weatherData.temp.current + '&#176;';
    const tempUnit = document.createElement('span')
      tempUnit.id = 'weather_unit';
      switch (configData.units) {
        case '':
          tempUnit.innerHTML = 'K'
          break
        case 'imperial':
          tempUnit.innerHTML = 'F'
          break
        case 'metric':
          tempUnit.innerHTML = 'C'
          break
      }
    tempWrapper.append(temp, tempUnit)
    leftWrapper.appendChild(tempWrapper)

    const feelsLikeWrapper = document.createElement('div')
      feelsLikeWrapper.id = 'weather_feelsWrapper';
    const feelsText = document.createElement('span');
      feelsText.innerHTML = 'Feels like ';
      feelsText.id = 'weather_feelsText';
    const feelsTemp = document.createElement('span');
    feelsTemp.innerHTML = weatherData.temp.feels_like + '&#176;';
      feelsTemp.id = 'weather_feelsTemp';
    const feelsUnit = document.createElement('span');
      switch (configData.units) {
        case '':
          feelsUnit.innerHTML = 'K'
          break
        case 'imperial':
          feelsUnit.innerHTML = 'F'
          break
        case 'metric':
          feelsUnit.innerHTML = 'C'
          break
      }

    feelsLikeWrapper.append(feelsText, feelsTemp, feelsUnit)
    leftWrapper.appendChild(feelsLikeWrapper)

    //right wrapper

    // location
    const locationWrapper = document.createElement('div');
      locationWrapper.id = 'weather_locationWrapper';
    const location = document.createElement('div');
      location.innerHTML = weatherData.location;
      location.id = 'weather_location';

      locationWrapper.appendChild(location);

    // description
    const descriptionWrapper = document.createElement('div');
      descriptionWrapper.id = 'weather_description'
    const descriptionStaticText = document.createElement('span');
      descriptionStaticText.innerHTML = 'description: ';
      descriptionStaticText.id = 'weather_descriptionStatic';
    const descriptionDynamText = document.createElement('span');
      descriptionDynamText.innerHTML = weatherData.description;
      descriptionDynamText.id = 'weather_descriptionDynam';

    descriptionWrapper.append(descriptionStaticText, descriptionDynamText);

    // hi lo tmep
    const highLowWrapper = document.createElement('div');
      highLowWrapper.id = 'weather_hiLoWrapper';
      // high temp
    const highTempWrapper = document.createElement('span');
      highTempWrapper.id = 'weather_highTempWrapper';
    const highTempStaticText = document.createElement('span');
      highTempStaticText.innerHTML = 'hi: ';
      highTempStaticText.id = 'weather_highTempStatic';
    const highTempDynamText = document.createElement('span');
      highTempDynamText.innerHTML = weatherData.temp.high + '&#176;';
      highTempDynamText.id = 'weather_highTempDynam';

    highTempWrapper.append(highTempStaticText, highTempDynamText);

      // low temp
    const lowTempWrapper = document.createElement('span');
      lowTempWrapper.id = 'weather_lowTempWrapper';
    const lowTempStaticText = document.createElement('span');
      lowTempStaticText.innerHTML = 'low: ';
      lowTempStaticText.id = 'weather_lowTempStatic';
    const lowTempDynamText = document.createElement('span');
      lowTempDynamText.innerHTML = weatherData.temp.low + '&#176;';
      lowTempDynamText.id = 'weather_lowTempDynam';

    lowTempWrapper.append(lowTempStaticText, lowTempDynamText);

    highLowWrapper.append(highTempWrapper, lowTempWrapper);

    // wind
    const windWrapper = document.createElement('div');
      windWrapper.id = 'weather_windWrapper';

    const windStaticText = document.createElement('span');
      windStaticText.innerHTML = 'wind: ';
      windStaticText.id = 'weather_windStatic';
    const windDynamText = document.createElement('span');
      windDynamText.id = 'weather_windDynam';
    let windUnit;
      switch (configData.units) {
        case '':
          windUnit = 'm/s'
          break
        case 'imperial':
          windUnit = 'mph'
          break
        case 'metric':
          windUnit = 'm/s'
          break
      }
    windDynamText.innerHTML = `${weatherData.wind.speed} ${windUnit}, ${weatherData.wind.direction}`;

    windWrapper.append(windStaticText, windDynamText);

      // humidity
    const humidityWrapper = document.createElement('div');
      humidityWrapper.id = 'weather_humidityWrapper';

    const humidityStaticText = document.createElement('span');
      humidityStaticText.innerHTML = 'humidity: ';
      humidityStaticText.id = 'weather_humidityStatic';
    const humidityDynamText = document.createElement('span');
      humidityDynamText.innerHTML = weatherData.humidity + '%';
      humidityDynamText.id = 'weather_humidityDynam';

    humidityWrapper.append(humidityStaticText, humidityDynamText);

    rightWrapper.append(locationWrapper, descriptionWrapper, highLowWrapper, windWrapper, humidityWrapper);
    wrapper.appendChild(rightWrapper);
  },

  _createDom: function(weatherData, configData){
    if(configData.type === 'current'){
      _createDomCurrent(weatherData, configData);
    }
  },

  getData: async function () {
    return await _getWeatherCurrent();
  },

  createDom: function (weatherData) {
    _createDom(weatherData, moduleData)
  },
})
