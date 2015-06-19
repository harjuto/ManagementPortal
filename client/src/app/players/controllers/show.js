(function() {
  var ShowCtrl = function(data, $location) {
    var show = this;
    
    /**
     * Player data received from /api/players/id/details
     */
    show.data = data;

    /**
     * Return to list page from show page.
     */
    show.back = function () {
      $location.path('/players');
    }
  };

  ShowCtrl.$inject = ["data", "$location"];

  angular.module('areas.players')
    .controller("PlayerShowCtrl", ShowCtrl);

})();
 