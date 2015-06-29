(function () {
  'use strict';
  
  var moneyTableController = function (PlayerListService, PlayerStore) {
    var moneytable = this;
    moneytable.PlayerStore = PlayerStore;
    
    PlayerListService.byMoney()
      .then(function (data) {
    		moneytable.players = data;
    });
    
  };
  
  moneyTableController.$inject = ['PlayerListService', 'PlayerStore'];
  
  var flagTableController = function (PlayerListService, PlayerStore) {
    var flagtable = this;
    flagtable.PlayerStore = PlayerStore;
    
    PlayerListService.byFlags()
      .then(function (data) {
        flagtable.players = data;
    });
  };
  
  flagTableController.$inject = ['PlayerListService', 'PlayerStore'];
  
  angular.module('table')
    .controller('MoneyTableCtrl', moneyTableController)
    .controller('FlagTableCtrl', flagTableController);
  
  
  
  
  
  
  
  var tableController = function (PlayerListService, PlayerStore, $state) {
    var table = this;
//    table.PlayerStore = PlayerStore;
//
//    table.filters = {
//      reverse: true,
//      player: {
//        login: {
//          isBanned: false,
//          suspendedUntil: undefined
//        }
//      }
//    };
//    
//    table.show = function (id) {
//      table.PlayerStore.setStage(id);
//    };
//    
//    table.showAlliance = function (id) {
//      PlayerStore.resetStage();
//      $state.go('dashboard.alliance');
//    };


  };


  tableController.$inject = ["PlayerListService", "PlayerStore", "$state"];


  angular.module('table')
    .controller('TableCtrl', tableController);

})();