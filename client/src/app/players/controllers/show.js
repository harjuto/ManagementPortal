(function() {
  var ShowCtrl = function(playerData) {
    var show = this;
    show.player = playerData;

  };

  ShowCtrl.$inject = ["playerData"];

  angular.module('areas.players.controllers')
    .controller("PlayerShowCtrl", ShowCtrl);

})();
