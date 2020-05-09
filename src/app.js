'use strict';

const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.static('public'));


module.exports = {
  server: app,
  start: port => {
    app.listen(port, () => console.log(`server up on ${port}`));
  }
}