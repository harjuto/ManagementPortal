angular.module('security', ['AdalAngular'])

.config(['$routeProvider', '$locationProvider', '$httpProvider', 'adalAuthenticationServiceProvider', function($routeProvider, $locationProvider, $httpProvider, adalAuthenticationServiceProvider) {
  adalAuthenticationServiceProvider.init({
      tenant: "lpactivedirectory.onmicrosoft.com",
      clientId: "4b94dad1-0ca2-4ccc-8975-5df5057f0d14"
    },
    $httpProvider
  );

}]);