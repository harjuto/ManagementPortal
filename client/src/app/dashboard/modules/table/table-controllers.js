(function () {
  var tableController = function (PlayerListService, DataService, $state) {
    var table = this;
    table.DataService = DataService;

    table.filters = {
      reverse: true,
      player: {
        login: {
          isBanned: false,
          suspendedUntil: undefined
        }
      }
    };
    
    table.show = function (id) {
      table.DataService.setStage(id);
    };
    
    table.showAlliance = function (id) {
      $state.go('dashboard.alliance');
    }

      table.DataService.list();
  };


  tableController.$inject = ["PlayerListService", "DataService", "$state"];


  angular.module('table')
    .controller('TableCtrl', tableController);

})();