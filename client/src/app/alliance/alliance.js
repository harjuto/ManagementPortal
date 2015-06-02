(function() {
  angular.module('areas.alliance', [])

  .config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

    $routeProvider
      .when('/alliance/:id', {
        name: 'alliance',
        templateUrl: '/app/alliance/alliance.tpl.html',
        controller: 'AllianceShowCtrl',
        controllerAs: 'show',
        resolve: {
          allianceData: ['AllianceService', '$route', function(AllianceService, $route) {
            return AllianceService.show($route.current.params.id);
          }]
        }
      })
    
  }]);
})();
