angular.module('areas.info', [])

.config(['$routeProvider', function($routeProvider){
	$routeProvider.when('/info', {
		name: 'info',
		templateUrl: '/app/info/info.tpl.html',
		controller: 'InfoCtrl',
		controllerAs: 'info'
	});
}])

.controller('InfoCtrl', ['$scope', function($scope){
	var self = this;
}]);