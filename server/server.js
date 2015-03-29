// server.js
var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var log = require('./lib/logger/logger')(module);
var methodOverride = require('method-override');

var config = require('./lib/config');

require('express-namespace');

var app = express();

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({
  'extended': 'true'
}));
app.use(bodyParser.json());
app.use(bodyParser.json({
  type: 'application/vnd.api+json'
}));
app.use(methodOverride());

require('./lib/routes/static').addRoutes(app);
require('./lib/routes/app').addRoutes(app);
require('./lib/routes/api').addRoutes(app);

app.listen(config.get('port'), function() {
  log.info('Express server listening on port ' + config.get('port'));
});
