(function() {
  var AllianceController = function (AllianceService, $state) {
    var alliance = this;
    
     /**
     * Link to AllianceService, used to determine when to show spinner
     */
    alliance.AllianceService = AllianceService;
    
    /**
     * List object which holds necessary values to control player list
     */
    alliance.list = {
      players: [],
      filters: {
        reverse: true,
        player: {
          login: {
            isBanned: false,
            suspendedUntil: undefined
          }
        }
      }
    };
    /**
     * Alliance data received from /api/players/alliance/id
     */


    /**
     * Query for alliance players
//     */
//    AllianceService.players(alliance.id)
//      .then(function (players) {
//      alliance.list.players = players
//    });
//    
    /**
     * Return to list page from alliance show page.
     */
    alliance.close = function () {
      $state.go('dashboard');
    }
  };

  AllianceController.$inject = ["AllianceService", "$state"];

  var AllianceToolbarController = function ($state) {
    var toolbar = this;
    
    toolbar.close = function () {
      $state.go('dashboard');
    }
    
  }

  angular.module('alliance')
    .controller("AllianceCtrl", AllianceController)
  	.controller('AllianceToolbarCtrl', AllianceToolbarController)
})();
 