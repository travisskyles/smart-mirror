'use strict';

const Server = require('./server.js');
const fs = require('fs');
const path = require('path');

global.root_path = path.resolve(__dirname + '/../');

class App {

  /*
   * Checks if the config file exists and then loads the config
   * and combines it with the defaults. Then returns the config.
   * If no config found returns the default config.
   * @returns {obj} configuration object
   */
  _loadConfig(){
    console.log('Loading configuration file...');
    const defaultsFile = require(__dirname + '/../config/defaults.js');

    try{
      fs.existsSync(__dirname + '../config/config.js', fs.F_OK)
      const configFile = require(__dirname + '/../config/config.js');
      const config = Object.assign(defaultsFile, configFile);
      return config;
    }
    catch(e){
      console.error('ERROR! Could not load config file. Starting with default configuration. Error found : ' + e);
      return defaultsFile;
    }
  }

  /*
   * Starts the app
   */
  start(){
      const config = this._loadConfig();
      console.log(config);
      const server = new Server(config);
      server.start();
    }
}

module.exports = new App();