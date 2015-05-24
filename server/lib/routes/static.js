var express = require("express");
var router = express.Router();
var path = require('path');
var compression = require('compression');
var config = require('../config');

//Static resources (css, js, images)
router.use(compression({
  threshold: 512
}));
router.use(express.static(path.resolve(__dirname, config.get('distFolder'))));
router.use(function(req, res, next) {
  res.sendStatus(404);
});

module.exports = router;
