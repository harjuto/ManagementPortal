(function () {
	'use strict';

	var stageMainController = function ($scope, PlayerService, PlayerStore) {
		var stage = this;
		stage.details = undefined;

        $scope.$watch(function () {
			return PlayerStore.playerId;
        },
			function (id) {
				if (id) {
					PlayerService.show(id)
						.then(function (data) {
						stage.details = data;
					});
				};
		});

        stage.closeStage = function () {
			PlayerStore.resetStage();
		};
	};

	stageMainController.$inject = ['$scope', 'PlayerService', 'PlayerStore'];


	angular.module('stage')
		.controller('StageMainCtrl', stageMainController);
})();