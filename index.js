'use strict';

require('dotenv').config();

const server = require('./src/app.js');


server.start(process.env.PORT);