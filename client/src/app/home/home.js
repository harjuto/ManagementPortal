angular.module('areas.home', [])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/home', {
    name: 'home',
    templateUrl: '/app/home/home.tpl.html',
    controller: 'HomeCtrl',
    controllerAs: 'home',
    access: {
      requiredLogin: true
    }
  });
}])

.controller('HomeCtrl', ['$scope', function($scope) {
  var self = this;

}]);
