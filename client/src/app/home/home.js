angular.module('areas.home', ['uiGmapgoogle-maps', 'ngMessages', 'home.directives'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/', {
    name: 'home',
    templateUrl: '/app/home/home.tpl.html',
    controller: 'HomeCtrl',
    controllerAs: 'home'
  });
}])

.config(
  ['uiGmapGoogleMapApiProvider', function(GoogleMapApiProvider) {
    GoogleMapApiProvider.configure({
      v: '3.17',
      libraries: 'places',
    });
  }])

.controller('HomeCtrl', ['$scope', 'MapService', function($scope, MapService) {
  var self = this;
  MapService.mapPromise.then(function(map) {
    self.map = map;
  });


}]);
