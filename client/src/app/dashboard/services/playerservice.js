/**
 * Service for handling player spesific actions
 * Author Tomi Harju
 */

angular.module('dashboard')
  .factory('PlayerService', ["$http", "$q", function ($http, $q) {
  var PlayerService = {};
  
  /**
   * Called when route changes to /players/id
   * Fetches player general info
   */
  PlayerService.show = function (id) {
    var defer = $q.defer();
    $http.get('http://lp-management-portal.azurewebsites.net/api/accounts/' + id )
      .success(function (result) {
      defer.resolve(result);
    })
      .error(function (result) {
      defer.reject(result);
    });
    return defer.promise;
  };

  /**
   * Called when submitting a reward
   * Params: reward object with given stardust and alloy values and a message 
   * to send to the rewarded player.
   */
  PlayerService.reward = function (reward) {
    var defer = $q.defer();
    //Temporary conversion until api is camelcase again :)
    var data = {
      Alloy: reward.alloy,
      Stardust: reward.stardust,
      Message: reward.message,
      PlayerId: reward.playerId
    };
    $http.post('http://lp-management-portal.azurewebsites.net/api/rewards/', data)
      .success(function (result) {
      defer.resolve(result);
    })
      .error(function (result) {
      defer.reject(result);
    });
    return defer.promise;
  };
  
  /**
   * Called by player-resolve-flags directive.
   * Fetches player flag information. 
   */
  PlayerService.flags = function (id) {
    var defer = $q.defer();
    $http.get('http://lp-management-portal.azurewebsites.net/api/players/' + id + '/flags')
      .success(function (result) {
      defer.resolve(result);
    })
      .error(function (result) {
      defer.reject(result);
    })
    return defer.promise;
  };
  
  /**
   * Resolve flag with id
   */
  PlayerService.resolve = function (playerId, flagId) {
    var defer = $q.defer();
    $http.put('http://lp-management-portal.azurewebsites.net/api/players/' + playerId + '/flags/' + flagId + '/resolve')
      .success(function (result) {
      defer.resolve(result);
    })
      .error(function (result) {
      defer.reject(result);
    })
    return defer.promise;
  };
  
  /**
   * Ban player
   */
  PlayerService.ban = function (playerId, doBan) {
     var defer = $q.defer();
    $http.put('http://lp-management-portal.azurewebsites.net/api/accounts/' + playerId + '/ban/' + doBan)
      .success(function (result) {
      defer.resolve(result);
    })
      .error(function (result) {
      defer.reject(result);
    })
    return defer.promise; 
  }
  
  /**
   * Suspend player
   */
  PlayerService.suspend = function (playerId) {
    var defer = $q.defer();
    $http.put('http://lp-management-portal.azurewebsites.net/api/accounts/' + playerId + '/suspend/' + new Date().getTime())
      .success(function (result) {
      defer.resolve(result);
    })
      .error(function (result) {
      defer.reject(result);
    })
    return defer.promise;
  };

  return PlayerService;
}]);
