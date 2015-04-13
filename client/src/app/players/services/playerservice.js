angular.module('areas.players.services', [])
  .factory('PlayerService', ["$http", "ConfigService", "$q", function($http, ConfigService, $q) {
    var PlayerService = {};

    PlayerService.list = function() {
      var defer = $q.defer();

      $http.get(ConfigService.config.apiBaseURL + 'players').
      success(function(result) {
        defer.resolve(result);
      }).error(function(result) {
        defer.reject(result);
      });

      return defer.promise;
    };

    PlayerService.show = function(id) {
      $http.get(ConfigService.config.apiBaseURL + 'players/' + id);
    };




    return PlayerService;
  }]);