var express = require("express");
var router = express.Router();
var security = require('./security.js');
var resJson = [];
for (var i = 0; i < 500; i++) {
  resJson.push({
    id: i,
    name: "Pekka " + i,
    dateCreated: new Date(),
    lastLogin: new Date()
  });
}

//Secure api calls
router.all('/*', security.securityCheck);

//List players
router.get('/players', function(req, res) {
  console.log("Player list called");
  res.json(resJson);
});

module.exports = router;
