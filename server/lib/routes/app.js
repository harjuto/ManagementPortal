var config = require('../config');
var path = require('path');
var express = require('express');
var api = require("./api.js");
var staticResources = require('./static.js');
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

  //API
  app.use("/api", api);

  //Render index if any other url
  app.use(function(req, res) {
    res.sendfile('index.html', {
      root: path.resolve(__dirname, config.get('distFolder'))
    });
  });


};