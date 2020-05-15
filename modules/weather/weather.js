'use strict'

var weather = (function () {
  const defaults = {
    location: {
      place: null,
      lat: null,
      lon: null,
    },
    type: 'current', // current, forecast
    units: '', //imperial, metric, default Kelvin
    appid: '',
  }

  const data = Object.assign({}, defaults, config.modules[0].config)
  console.log(data)

  const setLocation =function () {
    getLocation(function (lat, lon) {
      const geo = {
        location: {
          lat: lat,
          lon: lon,
        },
      }
      Object.assign(data, geo)

      console.log(data.location.lat)
      console.log(data.location.lon)
      getWeather()
    })
  }

  const validateData = function () {
    if (!data.location.lat || !data.location.lon) {
      setLocation()
    } else {
      getWeather()
    }
  }

  const getWeather = async function () {
    let weatherObj = {}

    let exclude

    switch (data.type) {
      case 'current':
        exclude = 'minutely,hourly,daily'
        break
      case 'forecast':
        exclude = 'current,minutely,hourly'
        break
    }
    console.log(exclude)

    return fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${data.location.lat}&lon=${data.location.lon}&exclude=${exclude}&appid=${data.appid}&units=${data.units}`)
      .then(response => response.json())
      .then(results => {
        console.log(results)
        if (data.type === 'current') {
          weatherObj = {
            time: moment(results.dt).format('LT'),
            icon: results.current.weather[0].id,
            temp: results.current.temp,
            feels_like: results.current.feels_like,
          }
        }

        console.log(weatherObj);
        return weatherObj;
      })
  }

  const createDomObjects = function(weatherData){
    console.log(weatherData)
    const moduleLocation = document.getElementsByClassName('container weather_module')

    const wrapper = document.createElement('div')
    const leftWrapper = document.createElement('div')
    const rightWrapper = document.createElement('div')
    console.log(moduleLocation)
    moduleLocation[0].appendChild(wrapper)
    wrapper.append(leftWrapper, rightWrapper)

    const icon = document.createElement('i');
    icon.classList.add('wi', `wi-owm-${weatherData.icon}`);
    console.log(icon);
    leftWrapper.appendChild(icon);

    const tempWrapper = document.createElement('div')
    const temp = document.createElement('span')
    temp.id = 'weather_temp'
    temp.innerHTML = weatherData.temp;
    const degree = document.createElement('span')
    degree.innerHTML = '&#176;'
    const unit = document.createElement('span')
    switch (data.units) {
      case '':
        unit.innerHTML = 'K'
        break
      case 'imperial':
        unit.innerHTML = 'F'
        break
      case 'metric':
        unit.innerHTML = 'C'
        break
    }
    tempWrapper.append(temp, degree, unit)
    leftWrapper.appendChild(tempWrapper)

    const feelsLikeWrapper = document.createElement('div')
    const feelsText = document.createElement('span')
    feelsText.innerHTML = 'Feels like '
    const feelsTemp = document.createElement('span')
    feelsTemp.innerHTML = weatherData.feels_like;
    feelsTemp.id = 'weather_feelsTemp'
    const feelsDeg = document.createElement('span')
    feelsDeg.innerHTML = '&#176;'
    const feelsUnit = document.createElement('span')
    switch (config.units) {
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

    feelsLikeWrapper.append(feelsText, feelsTemp, feelsDeg, feelsUnit)
    leftWrapper.appendChild(feelsLikeWrapper)
    // wrapper.id = 'weather';

    // let fragment = new DocumentFragment();
    // fragment.append(wrapper);
    console.log(wrapper)
  }

  return {
    getData: async function () {
      // return await validateData()
      return await getWeather();
    },

    createDom: function (data) {
      createDomObjects(data)
    },
  }
})()

// weather.getData();
