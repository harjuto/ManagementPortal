angular.module('app', [
  'ngRoute',
  'ConfigService',
  'security',
  'page.frame',
  'areas.dashboard',
  'areas.home',
  'areas.players'
])

.config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.html5Mode({
    enabled: true,
    requireBase: false
  }).hashPrefix('!');

  $routeProvider.when('/', {
    redirectTo: '/home'
  });
}]);