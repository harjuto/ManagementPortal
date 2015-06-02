(function() {
  var ShowCtrl = function(allianceData, $location) {
    var show = this;
    
    /**
     * Alliance data received from /api/players/alliance/id
     */
    show.alliance = allianceData;

    /**
     * Return to list page from show page.
     */
    show.back = function () {
      $location.path('/players');
    }
  };

  ShowCtrl.$inject = ["allianceData", "$location"];

  angular.module('areas.alliance')
    .controller("AllianceShowCtrl", ShowCtrl);

})();
 