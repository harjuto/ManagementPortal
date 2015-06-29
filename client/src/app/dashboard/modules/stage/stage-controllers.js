(function () {
	'use strict';

	var stageMainController = function ($scope, PlayerService, PlayerStore) {
		var stage = this;
		stage.details = undefined;
		stage.loading = false;
        $scope.$watch(function () {
			return PlayerStore.playerId;
        },
			function (newId, oldId) {
				if (newId) {
					stage.msg = undefined;
					stage.loading = true;
					PlayerService.show(newId)
						.then(function (data) {
							stage.details = data;
							stage.loading = false;
						}, function (error) {
							stage.msg = "Nothing found."
							stage.details = undefined;
							stage.loading = false;
					});
				};
			});
		
		stage.query = function (queryString) {
			PlayerStore.playerId = queryString;
		};
		
	};

	stageMainController.$inject = ['$scope', 'PlayerService', 'PlayerStore'];


	angular.module('stage')
		.controller('StageMainCtrl', stageMainController);
})();