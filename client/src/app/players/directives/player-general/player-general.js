(function() {
  var PlayerGeneralDirective = function() {
    return {
      restrict: 'E',
      templateUrl: '/app/players/directives/player-general/player-general.tpl.html',
      scope: {
        player: "="
      },
      controller: function() {

      }
    };
  };

  PlayerGeneralDirective.$inject = [];
  angular.module('areas.players.directives')
    .directive('playerGeneral', PlayerGeneralDirective);
})();