(function() {
  var ShowCtrl = function(playerData, $location) {
    var show = this;
    
    /**
     * Player data received from /api/players/id/details
     */
    show.player = playerData;

    /**
     * Return to list page from show page.
     */
    show.back = function () {
      $location.path('/players');
    }
  };

  ShowCtrl.$inject = ["playerData", "$location"];

  angular.module('areas.players.controllers')
    .controller("PlayerShowCtrl", ShowCtrl);

})();
 