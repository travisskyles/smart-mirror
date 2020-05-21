'use strict';

const express = require('express');
// const cors = require('cors');
const app = express();

class Server {
  
  constructor(config){
    this.config = config;
    this.port = config.port;
    this.server = app;
  }

  start = function(){
    this.server.listen(this.port, () => console.log(`server up on ${this.port}`));
  };
}

module.exports = Server;
