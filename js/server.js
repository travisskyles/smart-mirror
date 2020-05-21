'use strict';

const express = require('express');
// const cors = require('cors');
const app = express();
const open = require('open');

class Server {
  
  constructor(config){
    this.config = config;
    this.port = config.port;
    this.server = app;
  }

  _get(){
    this.server.get('/', (req, res) => {
      res.send('hello world');
    })
  }

  start(){
    this._get();
    this.server.listen(this.port, () => console.log(`server up on ${this.port}`));
    open(`http://localhost:${this.port}/`);
  };
}

module.exports = Server;
