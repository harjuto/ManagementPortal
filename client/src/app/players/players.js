(function() {
  angular.module('areas.players', [])

  .config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

    $routeProvider
      .when('/players', {
        name: 'players',
        templateUrl: '/app/players/players.tpl.html',
        controller: 'PlayerListCtrl',
        controllerAs: 'list'
      })
      
      .when('/players/:id', {
        name: 'showplayer',
        templateUrl: '/app/players/player.tpl.html',
        controller: 'PlayerShowCtrl',
        controllerAs: 'show',
        resolve: {
          data: ['PlayerService', '$route', function(PlayerService, $route) {
            return PlayerService.show($route.current.params.id);
          }]
        }
      });
  }]);
})();
