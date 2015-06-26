(function () {
	'use strict';
	
	
	var moneyTableDirective = function () {
		return {
			restrict: 'E',
			replace: false,
			controller: 'MoneyTableCtrl',
			controllerAs: 'moneytable',
			templateUrl: '/app/dashboard/modules/table/moneytable.tpl.html'
		};
	};
	
	var flagTableDirective = function () {
		return {
			restrict: 'E',
			replace: false,
			controller: 'FlagTableCtrl',
			controllerAs: 'flagtable',
			templateUrl: '/app/dashboard/modules/table/flagtable.tpl.html'
		};
	};
	
	
	angular.module('table')
		.directive('moneyTable', moneyTableDirective)
		.directive('flagTable', flagTableDirective);
})();