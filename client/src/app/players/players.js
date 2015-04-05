var PlayersController = function(list) {
  var players = this;
  players.list = list;
};

PlayersController.$inject = ["list"];


angular.module('areas.players', [
  'areas.players.services',
  'areas.players.directives'
])

.controller("PlayersCtrl", PlayersController)

.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
  $locationProvider.html5Mode({
    enabled: true,
    requireBase: false
  });

  $routeProvider.when('/players', {
    name: 'players',
    templateUrl: '/app/players/players.tpl.html',
    controller: 'PlayersCtrl',
    controllerAs: 'players',
    resolve: {
      list: ['PlayerService', function(PlayerService) {
        return PlayerService.list();
      }]
    },
    access: {
      requiredLogin: true
    }

  });
}]);
