angular.module('areas.players', [
  'areas.players.services',
  'areas.players.directives'
])

.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/players', {
      name: 'players',
      templateUrl: '/app/players/players.tpl.html',
      controller: 'PlayersCtrl',
      controllerAs: 'players',
      resolve: {
        list: ['PlayerService', function(PlayerService) {
            return PlayerService.list();
          }]
      }
    });
  }])

.controller('PlayersCtrl', ['$scope', 'list', function($scope, list) {
    var players = this;
    players.list = list;
  }]);
