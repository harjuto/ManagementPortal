var express = require('express');
var compression = require('compression');
var config = require('../config');
var path = require('path');

exports.addRoutes = function(app) {
  app.use(config.get('staticUrl'), compression({
		threshold: 512
	}));
	app.use(config.get('staticUrl'), express.static(path.resolve(__dirname, config.get('distFolder'))));
	app.use(config.get('staticUrl'), function(req, res, next) {
		res.send(404);
	});
};
