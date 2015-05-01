(function() {
  'use strict';

  var express = require("express");
  var router = express.Router();
  var request = require('request');
  var crypto = require('crypto');
  var AuthenticationContext = require('adal-node').AuthenticationContext;


  var adParameters = {
    tenant: 'lpactivedirectory.onmicrosoft.com',
    authorityHostUrl: 'https://msdn.microsoft.com/library/azure/dn132633#BKMK_AppObject',
    clientId: process.env.clientId || '4b94dad1-0ca2-4ccc-8975-5df5057f0d14', //'3b4d50a1-e50d-49b4-b0c0-d27413dea118'
    clientSecret: process.env.clientSecret || '2XUrys1/CVoJCukszVTuOxkYIZH9zGOg6YBIX1HhfdM='
  };

  var authorityUrl = adParameters.authorityHostUrl + '/' + adParameters.tenant;
  var redirectUri = (process.env.serverurl || 'http://localhost:1337') + '/security/getAToken';
  var resource = 'https://lpactivedirectory.onmicrosoft.com/lp-portal';

  var templateAuthzUrl = 'https://login.windows.net/' + adParameters.tenant + '/oauth2/authorize?response_type=code&client_id=<client_id>&redirect_uri=<redirect_uri>&state=<state>&resource=<resource>';


  function createAuthorizationUrl(state) {
    var authorizationUrl = templateAuthzUrl.replace('<client_id>', adParameters.clientId);
    authorizationUrl = authorizationUrl.replace('<redirect_uri>', redirectUri);
    authorizationUrl = authorizationUrl.replace('<state>', state);
    authorizationUrl = authorizationUrl.replace('<resource>', resource);
    return authorizationUrl;
  }

  // Clients get redirected here in order to create an OAuth authorize url and redirect them to AAD.
  // There they will authenticate and give their consent to allow this app access to
  // some resource they own.
  router.get('/auth', function(req, res) {
    //State is just random value sent to AD. Ad returns that state back.
    crypto.randomBytes(48, function(ex, buf) {
      var token = buf.toString('base64').replace(/\//g, '_').replace(/\+/g, '-');

      res.cookie('authstate', token);
      var authorizationUrl = createAuthorizationUrl(token);

      res.redirect(authorizationUrl);
    });
  });

  // After consent is granted AAD redirects here.  The ADAL library is invoked via the
  // AuthenticationContext and retrieves an access token that can be used to access the
  // user owned resource.
  router.get('/getAToken', function(req, res, next) {

    //State is used to prevent CRSF attacks
    if (req.cookies.authstate !== req.query.state) {
      res.send('error: state does not match');
    }
    var authenticationContext = new AuthenticationContext(authorityUrl);

    request({
      url: "https://login.windows.net/" + adParameters.tenant + "/oauth2/token",
      method: "POST",
      json: true,
      form: {
        code: req.query.code,
        redirect_uri: redirectUri,
        resource: resource,
        client_id: adParameters.clientId,
        client_secret: adParameters.clientSecret,
        grant_type: 'authorization_code'

      },
    }, function(error, response, body) {
      if (!error && response.statusCode == 200) {
        res.sendStatus(200);
      }

    });

  });



  module.exports = router;
})();
