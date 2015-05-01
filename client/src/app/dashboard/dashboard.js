(function() {
  var DashboardCtrl = function($location) {};

  DashboardCtrl.$inject = ['$location'];

  angular.module('areas.dashboard', [])
    .controller("DashboardCtrl", DashboardCtrl)

  .config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/dashboard', {
      name: 'dashboard',
      templateUrl: '/app/dashboard/dashboard.tpl.html',
      controller: 'DashboardCtrl',
      controllerAs: 'dashboard'
    });
  }]);
})();