(function() {
  var PlayerFinanceDirective = function() {
    return {
      restrict: 'E',
      templateUrl: '/app/players/directives/player-finance/player-finance.tpl.html',
      scope: {
        player: "="
      },
      controller: function() {

      }
    };
  };

  PlayerFinanceDirective.$inject = [];
  angular.module('areas.players')
    .directive('playerFinance', PlayerFinanceDirective);
})();
