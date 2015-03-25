angular.module('app', [
  'ngRoute',
  'ngStorage',
  'areas.home',
  'areas.info',
  'areas.profile',
  'directives.navigation',
  'services.security',
  'services.config',
  'services.mapServiceModule'
])

.config(['$httpProvider', function($httpProvider) {
    $httpProvider.interceptors.push('TokenInterceptor');
  }])
  .run(['$rootScope', '$location', '$window', 'AuthenticationService', function($rootScope, $location, $window, AuthenticationService) {
    FastClick.attach(document.body);
    $rootScope.$on("$routeChangeStart", function(event, nextRoute, currentRoute) {
      //redirect only if both isAuthenticated is false and no token is set
      if (nextRoute !== undefined && nextRoute.access !== undefined && nextRoute.access.requiredLogin && !AuthenticationService.isAuthenticated()) {
        $location.path("/home");
      }
    });
  }])
  .controller('MainCtrl', ['$scope', 'AuthenticationService', 'UserService',
    function($scope, AuthenticationService, UserService) {

      this.login = function(user) {
        console.log(user);
        UserService.login(user).then(function(result) {
            $('#loginModal').hide();
          },
          function(reason) {
            // add something like "coudnt log in here"
            alert(reason);
          });
      };

      this.signup = function(user) {
        UserService.signup(user).then(function(result) {
          //handle success
          alert("YES BONUS");
        }, function(reason) {
          // handle error'
          alert(reason);
        });
      };

    }
  ]);