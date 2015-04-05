angular.module('security', [])

.config(['$routeProvider', '$locationProvider', '$httpProvider', function($routeProvider, $locationProvider, $httpProvider) {
  $httpProvider.interceptors.push('TokenInceptor');

  $locationProvider.html5Mode({
    enabled: true,
    requireBase: false
  });

  $routeProvider.when('/login', {
    name: 'login',
    templateUrl: '/app/auth/login.tpl.html',
    controller: 'LoginCtrl',
    controllerAs: 'login'
  });
}]);
