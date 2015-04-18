(function() {
  'use strict';

  var express = require("express");
  var router = express.Router();
  var crypto = require('crypto');
  var AuthenticationContext = require('adal-node').AuthenticationContext;


  var sampleParameters = {
    tenant: 'lpactivedirectory.onmicrosoft.com',
    authorityHostUrl: 'https://msdn.microsoft.com/library/azure/dn132633#BKMK_AppObject',
    clientId: '3b4d50a1-e50d-49b4-b0c0-d27413dea118'
  };

  var authorityUrl = sampleParameters.authorityHostUrl + '/' + sampleParameters.tenant;
  var redirectUri = 'http://localhost:1337/security/getAToken';
  var resource = 'http://lp-portal-font.com';

  var templateAuthzUrl = 'https://login.windows.net/' + sampleParameters.tenant + '/oauth2/authorize?response_type=code&client_id=<client_id>&redirect_uri=<redirect_uri>&state=<state>&resource=<resource>';


  function createAuthorizationUrl(state) {
    var authorizationUrl = templateAuthzUrl.replace('<client_id>', sampleParameters.clientId);
    authorizationUrl = authorizationUrl.replace('<redirect_uri>', redirectUri);
    authorizationUrl = authorizationUrl.replace('<state>', state);
    authorizationUrl = authorizationUrl.replace('<resource>', resource);
    return authorizationUrl;
  }

  // Clients get redirected here in order to create an OAuth authorize url and redirect them to AAD.
  // There they will authenticate and give their consent to allow this app access to
  // some resource they own.
  router.post('/auth', function(req, res) {
    //req.setHeader('Access-Control-Allow-Origin', '*');

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
  router.get('/getAToken', function(req, res) {
    if (req.cookies.authstate !== req.query.state) {
      res.send('error: state does not match');
    }
    var authenticationContext = new AuthenticationContext(authorityUrl);
    authenticationContext.acquireTokenWithAuthorizationCode(req.query.code, redirectUri, resource, sampleParameters.clientId, sampleParameters.clientSecret, function(err, response) {
      var message = '';
      if (err) {
        message = 'error: ' + err.message + '\n';
      }
      message += 'response: ' + JSON.stringify(response);

      if (err) {
        res.send(message);
        return;
      }

      // Later, if the access token is expired it can be refreshed.
      authenticationContext.acquireTokenWithRefreshToken(response.refreshToken, sampleParameters.clientId, sampleParameters.clientSecret, resource, function(refreshErr, refreshResponse) {
        if (refreshErr) {
          message += 'refreshError: ' + refreshErr.message + '\n';
        }
        message += 'refreshResponse: ' + JSON.stringify(refreshResponse);

        res.send(message);
      });
    });
  });


  module.exports = router;
})();