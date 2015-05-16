angular.module('areas.players.services')
  .factory('PlayerService', ["$http", "$q", function ($http, $q) {
  var PlayerService = {};

  PlayerService.querying = false;

  PlayerService.list = function (queryType, queryString) {
    var defer = $q.defer();
    PlayerService.querying = true;
    $http.get('http://lp-management-portal.azurewebsites.net/api/players/filter/flags')//?' + queryType + '=' + queryString)
      .success(function (result) {
      PlayerService.querying = false;
      defer.resolve(result);
    })
      .error(function (result) {
      PlayerService.querying = false;
      defer.reject(result);
    });
    return defer.promise;
  };

  PlayerService.show = function (id) {
    var defer = $q.defer();
    $http.get('http://lp-management-portal.azurewebsites.net/api/player/?id=' + id)
      .success(function (result) {
      defer.resolve(result);
    })
      .error(function (result) {
      defer.reject(result);
    });
    return defer.promise;
  };

  PlayerService.reward = function (values) {
    var defer = $q.defer();
    $http.get('http://lp-management-portal.azurewebsites.net/api/player/?id=' + id)
      .success(function (result) {
      defer.resolve(result);
    })
      .error(function (result) {
      defer.reject(result);
    });
    return defer.promise;
  }



  return PlayerService;
}]);
