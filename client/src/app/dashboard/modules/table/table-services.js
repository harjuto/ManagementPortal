
(function () {
  var PlayerListService = function ($q, $http) {
    return {
      querying: false,
      byFlags: function () {
        var self = this;
        self.querying = true;
        var defer = $q.defer();
        $http.get('http://lp-management-portal.azurewebsites.net/api/accounts/filter/flags')
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
      byMoney: function () {
        var self = this;
        self.querying = true;
        var defer = $q.defer();
        $http.get('http://lp-management-portal.azurewebsites.net/api/accounts/filter/money')
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
      query: function (queryString) {
        var defer = $q.defer();
        var self = this;
        self.querying = true;
        $http.get('http://lp-management-portal.azurewebsites.net/api/accounts/' + queryString)
          .success(function (result) {
          self.querying = false;
          defer.resolve(result);
        })
          .error(function (result) {
          self.querying = false;
          defer.reject(result);
        });
        return defer.promise;
      }
    };
  };
  PlayerListService.$inject = ["$q", "$http"];
  angular.module('table')
    .factory('PlayerListService', PlayerListService);
})();