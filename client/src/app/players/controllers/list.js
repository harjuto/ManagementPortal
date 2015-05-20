(function () {


  var ListCtrl = function (PlayerListService, $location, $scope, $sessionStorage) {
    var list = this;

    list.PlayerListService = PlayerListService;
    list.players = $sessionStorage.players || [];

    list.showCount = 10;
   
    list.reverse = true;
    list.findByFlags = true;
    list.queryString = '';

    list.showPlayer = function (id) {
      $location.path("/players/" + id);
    };


    list.list = function () {
      list.clear();
      var promise;
      if (list.findByFlags) {
        promise = PlayerListService.byFlags();
      } else {
        promise = PlayerListService.byMoney();
      }
      promise.then(function (players) {
        list.players = players;
        console.log(list.players);
        $sessionStorage.players = players;
      });
    }
      list.query = function (queryString) {
        list.clear();
        list.byMoney = false;
        list.byFlags = false;
        PlayerListService.query(queryString)
          .then(function (players) {
          list.players = players;
          $sessionStorage.players = players;
        });
      }

      list.clear = function () {
        list.players = [];
        delete $sessionStorage.players;
      };
      list.list();
    };

    ListCtrl.$inject = ["PlayerListService", "$location", "$scope", "$sessionStorage"];

    angular.module('areas.players.controllers', [])
      .controller("PlayerListCtrl", ListCtrl);

  })();
