angular.module('areas.profile', [])

.config(['$routeProvider', function($routeProvider){
	$routeProvider.when('/profile', {
		name: 'profile',
		templateUrl: '/app/profile/profile.tpl.html',
		controller: 'ProfileCtrl',
		controllerAs: 'profile',
		access: {
			requiredLogin: true
		},
		resolve: {
			userInfo: ['UserService', function(UserService){
				return UserService.userInfo();
			}]
		}
	});
}])

.controller('ProfileCtrl', ['$scope', 'AuthenticationService', 'UserService', 'userInfo', function($scope, AuthenticationService, UserService, userInfo){
	var self = this;
	var user = userInfo.data;
	
	this.user = user;

	this.updateInfo = function(model){
		console.log(model);
		UserService.updateInfo(model);
	};
	
}]);