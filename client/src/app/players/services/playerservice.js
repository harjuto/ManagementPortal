angular.module('areas.players.services', [])
.factory('PlayerService', ["$http", "ConfigService", "$q", function($http, ConfigService, $q) {
    var PlayerService = {};

    PlayerService.list = function() {
      var defer = $q.defer();

      $http.get(ConfigService.config.apiBaseURL + 'players').
      then(function(result) {
        defer.resolve(result.data);
      }, function() {})

      return defer.promise;
    }
    PlayerService.show = function() {}




    return PlayerService;
  }]);
