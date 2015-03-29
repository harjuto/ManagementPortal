var config = require('../config');
var path = require('path');
var log = require('../logger/logger')(module);



var resJson = [];
for (var i = 0; i < 500; i++) {
  resJson.push({
    id: i,
    name: "Pekka " + i,
    dateCreated: new Date(),
    lastLogin: new Date()
  })
}

exports.addRoutes = function(app) {
  app.get('/api/players', function(req, res) {
    res.json(resJson);
  });
}
