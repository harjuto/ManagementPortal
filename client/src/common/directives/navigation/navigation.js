angular.module('directives.navigation', [])

.directive('navigation', ['$route', 'AuthenticationService', 'UserService',
	function($route, AuthenticationService, UserService){
	return {
		restrict: 'E',
		templateUrl: '/common/directives/navigation/navigation.tpl.html',
		link: function(scope, elem, attrs){
			scope.$route = $route;

			scope.isLogged = function(){
				return AuthenticationService.isAuthenticated();
			};

			scope.logout = function(){
				AuthenticationService.logout();
	};
		}
	};
}]);