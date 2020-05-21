'use strict';

const Server = require('./server.js');

class App {
  
  /*
   * _loadConfig(callback)
   * loads the config file and combines it with the defaults
   * then executes a callback with the config as the argument
   */
  _loadConfig = function(){
    console.log('Loading configuration file...');
    const defaultsFile = require('../config/defaults.js');
    const configFile = require('../config/config.js');

    const config = Object.assign(defaultsFile, configFile);
    
    return config;
  }


  start = function(){
      const config = this._loadConfig();
      const server = new Server(config);
      server.start();
    }
}

module.exports = new App();