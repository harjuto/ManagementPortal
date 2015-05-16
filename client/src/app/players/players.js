(function() {
  angular.module('areas.players', [
    'areas.players.controllers',
    'areas.players.services',
    'areas.players.directives'
  ])

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
          playerData: ['PlayerService', '$route', function(PlayerService, $route) {
            return PlayerService.show($route.current.params.id);
          }]
        }
      });
  }]);
})();
