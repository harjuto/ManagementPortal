var LoginCtrl = function($window, $location, UserAuthFactory, AuthenticationFactory) {
  var login = this;
  login.user = {
    email: undefined,
    password: undefined
  };

  login.login = function() {
    if (login.user.email !== undefined && login.user.password !== undefined) {
      UserAuthFactory.login(login.user.email, login.user.password).success(function(data) {
        AuthenticationFactory.isLogged = true;
        AuthenticationFactory.user = data.email;
        AuthenticationFactory.userRole = {};

        $window.sessionStorage.token = data.token;
        $window.sessionStorage.user = data.user; // to fetch the user details on refresh
        $window.sessionStorage.userRole = {}; //TODO: Do we need user roles?
        $location.path("/");

      }).error(function(error) {
        login.error = {
          msg: error.data,
          close: function() {
            login.error = undefined;
          }

        };
      });
    } else {
      alert('Invalid credentials');
    }

  };
};

LoginCtrl.$inject = ["$window", "$location", "UserAuthFactory", "AuthenticationFactory"];

angular.module('security')
  .controller("LoginCtrl", LoginCtrl);
