// Required Modules
var express = require("express");
var config = require('./lib/config');
var path = require("path");
var app = express();
var port = process.env.PORT || 1337;


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
  console.log('Express server listening on port ' + port);
});
