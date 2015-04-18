angular.module('app', [
    'ngRoute',
    'ConfigService',
    'security',
    'page.frame',
    'areas.dashboard',
    'areas.home',
    'areas.players'
  ])
  .config(['$httpProvider', '$routeProvider', function($httpProvider, $routeProvider) {
    $routeProvider.otherwise({
      redirectTo: '/'
    });

    $httpProvider.interceptors.push('TokenInceptor');
  }])

.run(['$rootScope', '$window', '$location', 'AuthenticationStorage', function($rootScope, $window, $location, AuthenticationStorage) {
  // when the page refreshes, check if the user is already logged in
  AuthenticationStorage.check();

  $rootScope.$on("$routeChangeStart", function(event, nextRoute, currentRoute) {
    if ((nextRoute.access && nextRoute.access.requiredLogin) && !AuthenticationStorage.isLogged) {
      $location.path("/login");

    } else {
      // check if user object exists else fetch it. This is incase of a page refresh
      if (!AuthenticationStorage.user) AuthenticationStorage.user = $window.sessionStorage.user;
    }
  });

  $rootScope.$on('$routeChangeSuccess', function(event, nextRoute, currentRoute) {
    // if the user is already logged in, take him to the home page
    if (AuthenticationStorage.isLogged === true && $location.path() == '/login') {
      $location.path('/');
    }
  });
}]);