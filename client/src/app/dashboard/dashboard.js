(function() {
  var DashboardCtrl = function() {

  };

  DashboardCtrl.$inject = [];

  angular.module('areas.dashboard', [])
    .controller("DashboardCtrl", DashboardCtrl)
    .config(['$routeProvider', function($routeProvider) {
      $routeProvider.when('/', {
        name: 'dashboard',
        templateUrl: '/app/dashboard/dashboard.tpl.html',
        controller: 'DashboardCtrl',
        controllerAs: 'dashboard',
        access: {
          requiredLogin: true
        }
      });
    }]);
})();