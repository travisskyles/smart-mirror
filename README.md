# smart-mirror
A modular smart mirror display application created using node.js for use with a raspberry pi.

## Install
- clone repository
- open directory and npm install
- copy the config_sample.js into the config folder as 'config.js'
- changed settings and add api keys as necessary
- npm start

## Current Modules

### Weather
- displays local weather using the openWeather API
#### Settings
- position: position on the screen
- location: city/state/country
- type: current weather conditions or 5 day forcast
- units: imperial or metric

### HelloWorld
- simple text displaying 'Hello World'
#### Settings
- position: position on the screen
