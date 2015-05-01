(function() {
  var PlayerDataDirective = function() {
    return {
      restrict: 'E',
      templateUrl: '/app/players/directives/player-data/player-data.tpl.html',
      scope: {
        player: "="
      },
      controller: function() {

      }
    };
  };

  PlayerDataDirective.$inject = [];
  angular.module('areas.players.directives')
    .directive('playerData', PlayerDataDirective);
})();