'use strict';

const express = require('express');
const cors = require('cors');
const app = express();
const open = require('open');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');

class Server {

  constructor(config){
    this.config = config;
    this.port = config.port;
    this.server = app;
  }

  _use(){
    const directories = ['/modules', '/css', '/js', '/config', '/helpers', '/dependencies', '/node_modules'];
    directories.forEach(directory => {
      console.log(global.root_path + directory);
      this.server.use(directory, express.static(global.root_path + directory));
    })
    app.use(cors());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json())
  }

  _get(){
    this.server.get('/', (req, res) => {
      let html = fs.readFileSync(path.resolve(global.root_path + '/index.html'), {encoding: 'utf8'});

      try{
        fs.existsSync(global.root_path + 'config/config.js');
        let configFile = 'config/config.js';
        html = html.replace('#CONFIG', configFile);
        res.send(html);
      }
      catch(e){
        console.error('ERROR! Could not find config file. Please create a config file and try again.' + e);
      }
    })
    this.server.get('/weather', (req, res) => {
      // const {units, place} = req.body;
      console.log(req.body);
      res.send('weather hello')
    })
  }

  _post(){
    this.server.post('/weather', (req, res) => {
      // const {units, place} = req.body;
      console.log(req.body);
      res.send('weather hello');
    })
  }

  start(){
    this._use();
    this._get();
    this._post();
    this.server.listen(this.port, () => console.log(`server up on ${this.port}`));
    open(`http://localhost:${this.port}/`);
  };
}

module.exports = Server;
