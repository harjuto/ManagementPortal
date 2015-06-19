

var PlayerListService = function ($q, $http) {
  return {
    byFlags: function () {
      var defer = $q.defer();
      $http.get('http://lp-management-portal.azurewebsites.net/api/accounts/filter/flags')
        .success(function (result) {
        defer.resolve(result);
      })
        .error(function (result) {
        defer.reject(result);
      });
      return defer.promise;
    },
    byMoney: function () {
      var defer = $q.defer();
      $http.get('http://lp-management-portal.azurewebsites.net/api/accounts/filter/money')
        .success(function (result) {
        defer.resolve(result);
      })
        .error(function (result) {
        defer.reject(result);
      });
      return defer.promise;
    },
    query: function (queryString) {
      var defer = $q.defer();
      $http.get('http://lp-management-portal.azurewebsites.net/api/accounts/' + queryString)
        .success(function (result) {
        defer.resolve(result);
      })
        .error(function (result) {
        defer.reject(result);
      });
      return defer.promise;
    }
  };
};
PlayerListService.$inject = ["$q", "$http"];
angular.module('dashboard')
  .factory('PlayerListService', PlayerListService);