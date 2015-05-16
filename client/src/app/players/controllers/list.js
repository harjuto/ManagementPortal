(function () {


  var ListCtrl = function (PlayerListService, $location, $scope, $sessionStorage) {
    var list = this;
    
    list.PlayerListService = PlayerListService;
    list.players = $sessionStorage.players || [];
    
    list.showCount = 10;
    list.filterObject = {
      login: {
        suspendedUntil: ''
      }
    };
    list.orderObject = "player.nickname";
    list.queryType = 'guid';
    list.queryString = '';
    
    list.byFlags = true;
    list.byMoney = false;

    list.showPlayer = function (id) {
      $location.path("/players/" + id);
    };
    

    list.queryByFlags = function () {
      list.clear();
      list.byFlags = true;
      list.byMoney = false;
      PlayerListService.byFlags()
        .then(function (players) {
        list.players = players;
        console.log(list.players);
        $sessionStorage.players = players;
      });
    };
    list.queryByMoney = function () {
      list.clear();
      list.byMoney = true;
      list.byFlags = false;
      PlayerListService.byMoney()
        .then(function (players) {
        list.players = players;
        $sessionStorage.players = players;
      });
    };
    
    
    list.clear = function () {
      list.players = [];
      delete $sessionStorage.players;
    };

  };

  ListCtrl.$inject = ["PlayerListService", "$location", "$scope", "$sessionStorage"];

  angular.module('areas.players.controllers', [])
    .controller("PlayerListCtrl", ListCtrl);

})();
