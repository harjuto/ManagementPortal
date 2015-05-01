/*
(function() {

  var AuthenticationStorage = function($location) {
    return {
      isLogged: false,
      user: undefined,
      check: function() {
        return this.isLogged;
      },
      logout: function() {
        if (this.isLogged) {
          this.isLogged = false;
          delete $window.sessionStorage.token;
          delete $window.sessionStorage.user;
          $location.path("/login");
        }
      }
    };
  };

  AuthenticationStorage.$inject = ["$location"];

  var UserAuthFactory = function($window, $location, $http) {
    return {
      login: function(email, password) {
        return $http.get('/security/auth', {
          email: email,
          password: password
        });
      }

    };
  };
  UserAuthFactory.$inject = ["$window", "$location", "$http"];

  var TokenInceptor = function($q, $window, $location, AuthenticationStorage) {
    return {
      request: function(config) {
        config.headers = config.headers || {};
        if ($window.sessionStorage.token) {
          config.headers['Authorization'] = $window.sessionStorage.token;
          config.headers['X-Key'] = $window.sessionStorage.user;
          config.headers['Content-Type'] = "application/json";
        }
        return config || $q.when(config);
      },

      response: function(response) {
        return response || $q.when(response);
      },
      responseError: function(error) {
        if (error.status === 401) {
          AuthenticationStorage.logout();
          return $q.reject(error);
        } else {
          return $q.reject(error);
        }
      }
    };
  };
//  TokenInceptor.$inject = ["$q", "$window", "$location", "AuthenticationStorage"];

  //  angular.module('security')
  //  .factory("TokenInceptor", TokenInceptor)
  //.factory("UserAuthFactory", UserAuthFactory)
  //.factory("AuthenticationStorage", AuthenticationStorage);
})();*/
