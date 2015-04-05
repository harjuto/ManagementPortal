var config = require('../config');
var path = require('path');
var express = require('express');
var api = require("./api.js");
var staticResources = require('./static.js');
var security = require("./security.js");
// app/routes.js
module.exports = function(app) {


  //Single-page-app entry
  app.get('/', function(req, res) {
    res.sendfile('index.html', {
      root: path.resolve(__dirname, config.get('distFolder'))
    });
  });

  //Static resources
  app.use("/static", staticResources);

  //Authentication
  app.use("/security", security.router);

  //API
  app.use("/api", api);


};