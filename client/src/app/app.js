angular.module('app', [
  'ngRoute',
  'ConfigService',
  'security',
  'ui.bootstrap',
  'page.frame',
  'areas.dashboard',
  'areas.home',
  'areas.players'
])

.config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $routeProvider.otherwise({
    redirectTo: '/home'
  });
}]);
