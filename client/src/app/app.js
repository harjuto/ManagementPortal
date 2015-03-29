angular.module('app', [
  'ngRoute',
  'ConfigService',
  'areas.home',
  'areas.players'
])

.controller("MainCtrl", ["$scope", "$location", "ConfigService", "$route", function($scope, $location, ConfigService, $route) {

    this.route = $route;
    $scope.goto = function(path) {
      $location.path(path);
    }

  }]);
