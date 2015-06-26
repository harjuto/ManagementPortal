(function () {
  'use strict';


var AllianceService = function ($q, $http) {
  return {
    show: function (id) {
      var defer = $q.defer();
      var self = this;
      self.querying = true;
      $http.get('http://lp-management-portal.azurewebsites.net/api/alliances/' + id)
        .success(function (result) {
        self.querying = false;
        defer.resolve(result);
      })
        .error(function (result) {
        self.querying = false;
        defer.reject(result);
      });
      return defer.promise;
    },
    players: function (id) {
      var defer = $q.defer();
      var self = this;
      self.querying = true;
      $http.get('http://lp-management-portal.azurewebsites.net/api/accounts/alliance/' + id)
        .success(function (result) {
        self.querying = false;
        defer.resolve(result);
        })
        .error(function (result) {
        self.querying = false;
        defer.reject(result);
        })
      return defer.promise;
    }
    
  };
};
AllianceService.$inject = ["$q", "$http"];
angular.module('alliance')
  .factory('AllianceService', AllianceService);
})();