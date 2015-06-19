(function () {


  var ListCtrl = function (PlayerListService, $location, $scope, $sessionStorage) {
    var list = this;

    /**
     * Link to PlayerListService, used to determine when to show spinner
     */
    list.PlayerListService = PlayerListService;
    
    /**
     * List data, use cached values if set.
     */
    list.players = $sessionStorage.players || [];

    /**
     * How many entries should be loaded, not used atm.
     */
    list.showCount = 10;
   
    /**
     * List filter values.
     */
    list.filters = {
      reverse: true,
      player: {
        login: {
            isBanned: false,
            suspendedUntil: undefined  
        }
      }
     
      
    };
    /**
     * Set by slider, determines which api to call (money or flags)
     */
    list.findByFlags = true;
    
    /**
     * Used for manual searching.
     */
    list.queryString = '';

    /**
     * Action to show player details, changes route to /players/id
     */
    list.showPlayer = function (id) {
      $location.path("/players/" + id);
    };
    
    /**
     * Action to show alliance page
     */
    list.showAlliance = function (id) {
      $location.path("/alliance/" + id);
    }

    /**
     * Used to query data to table.
     * TODO: Figure out how to cache results properly.
     */
    list.list = function () {
      /**
       * Empty old data first
       */
      list.clear();
      var promise;
      /**
       * Depending on switch position, eighter query by flags or by money
       */
      if (list.findByFlags) {
        promise = PlayerListService.byFlags();
      } else {
        promise = PlayerListService.byMoney();
      }
      promise.then(function (players) {
        /**
         * Once loaded, store to list.
         */
        list.players = players;
      });
    };

    /**
     * Function to handle manual querying
     */
    list.query = function (queryString) {
      /**
       * Empty old data first
       */
      list.clear();
      PlayerListService.query(queryString)
        .then(function (players) {
        /**
         * Once loaded, wrap result to an array since its a single object.
         */
        list.players = [players];
      });
    };

    /**
     * Function to empty both the model and cache
     */
    list.clear = function () {
      list.players = [];
      delete $sessionStorage.players;
    };
    
    /**
     * Initialize list. Use cache if set. Defaults to find by flags
     */
    list.list();
  };

  ListCtrl.$inject = ["PlayerListService", "$location", "$scope", "$sessionStorage"];

  angular.module('areas.players')
    .controller("PlayerListCtrl", ListCtrl);

})();
