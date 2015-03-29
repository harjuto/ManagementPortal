var config = require('../config');
var path = require('path');
var log = require('../logger/logger')(module);

exports.addRoutes = function(app) {
  app.get('/', function(req, res) {
    res.sendFile('index.html', {
      root: path.resolve(__dirname, config.get('distFolder'))
    })
  });
}
