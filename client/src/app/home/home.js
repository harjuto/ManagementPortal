angular.module('areas.home', [])

.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/', {
      name: 'home',
      templateUrl: '/app/home/home.tpl.html',
      controller: 'HomeCtrl',
      controllerAs: 'home'
    });
  }])

.controller('HomeCtrl', ['$scope', function($scope) {
    var self = this;


  }]);
