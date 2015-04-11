(function() {


  var ListCtrl = function(players, $location, $scope) {
    var list = this;
    list.players = players;

    list.showPlayer = function(id) {
      $location.path("/players/" + id);
      $scope.$apply();
    };
  };

  ListCtrl.$inject = ["players", "$location", "$scope"];

  angular.module('areas.players.controllers', [])
    .controller("PlayerListCtrl", ListCtrl);

})();