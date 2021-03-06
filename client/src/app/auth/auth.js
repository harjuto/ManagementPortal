angular.module('security', ['AdalAngular', 'app.config'])

  .config(['$locationProvider', '$httpProvider', 'adalAuthenticationServiceProvider', 'CLIENT_ID', function ($locationProvider, $httpProvider, adalAuthenticationServiceProvider, CLIENT_ID) {
  adalAuthenticationServiceProvider.init({
    tenant: "lpactivedirectory.onmicrosoft.com",
    clientId: CLIENT_ID,
    endpoints: {
      'http://lp-management-portal.azurewebsites.net/api': 'https://lpactivedirectory.onmicrosoft.com/lp-portal'
    },
  },
    $httpProvider
    );

}]);
