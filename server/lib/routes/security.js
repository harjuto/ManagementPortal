var express = require("express");
var router = express.Router();
var user = require('../config/user.js')();
var jwt = require("jsonwebtoken");

//Sign-in function
router.post('/authenticate', function(req, res) {
  if (req.body.email === user.email && req.body.password === user.password) {
    var token = jwt.sign(user, require('../config/key.js')(), {
      expiresInMinutes: 60
    });
    res.json({
      type: true,
      user: user.email,
      token: token
    });
  } else {
    res.status(401);
    res.json({
      type: false,
      data: "Incorrect email/password"
    });
  }
});

module.exports = {
  router: router,
  securityCheck: function(req, res, next) {
    var token = req.headers.authorization;
    if (typeof token !== 'undefined') {
      jwt.verify(token, require('../config/key.js')(), function(err, decoded) {
        if (err) {
          res.send(401);
        } else {
          next();
        }
      });
    } else {
      res.send(403);
    }
  }
};