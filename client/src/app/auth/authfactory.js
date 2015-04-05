(function() {

  var AuthenticationFactory = function($window) {
    var auth = {
      isLogged: false,
      check: function() {
        if ($window.sessionStorage.token && $window.sessionStorage.user) {
          this.isLogged = true;
        } else {
          this.isLogged = false;
          delete this.user;
        }
      }
    };

    return auth;
  };
  AuthenticationFactory.$inject = ['$window'];

  var UserAuthFactory = function($window, $location, $http, AuthenticationFactory) {
    return {
      login: function(email, password) {
        return $http.post('http://localhost:1337/security/authenticate', {
          email: email,
          password: password
        });
      },
      logout: function() {
        if (AuthenticationFactory.isLogged) {
          AuthenticationFactory.isLogged = false;
          delete AuthenticationFactory.user;
          delete AuthenticationFactory.userRole;

          delete $window.sessionStorage.token;
          delete $window.sessionStorage.user;
          delete $window.sessionStorage.userRole;

          $location.path("/login");
        }
      }
    };
  };
  UserAuthFactory.$inject = ["$window", "$location", "$http", "AuthenticationFactory"];

  var TokenInceptor = function($q, $window) {
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
      }
    };
  };
  TokenInceptor.$inject = ["$q", "$window"];

  angular.module('security')
    .factory("TokenInceptor", TokenInceptor)
    .factory("UserAuthFactory", UserAuthFactory)
    .factory("AuthenticationFactory", AuthenticationFactory);

})();
