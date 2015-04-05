// Required Modules
var express = require("express");
var morgan = require("morgan");
var bodyParser = require("body-parser");
var jwt = require("jsonwebtoken");
var config = require('./lib/config');
var path = require("path");

var app = express();
var port = process.env.PORT || 1337;

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.use(morgan("dev"));
app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
  next();
});
// routes ======================================================================


require('./lib/routes/app.js')(app);

// launch ======================================================================
app.listen(port, function() {
  console.log('Express server listening on port ' + config.get('port'));
});
