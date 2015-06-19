(function () {
	var dataService = function (PlayerListService, PlayerService) {

		var data = {
			players: [],
			showCount: 10,
			findByFlags: true,
			queryString: '',
			querying: false,
			playerId: undefined
		};
		
		
		data.query = function (queryString) {
			data.querying = true;
			data.clear();
			PlayerListService.query(queryString)
				.then(function (players) {
				data.players = [players];
				data.querying = false;
			});
		};
		
		data.list = function (id) {
			data.querying = true;
			data.clear();
			var promise;
			if (data.findByFlags) {
				promise = PlayerListService.byFlags();
			} else {
				promise = PlayerListService.byMoney();
			}
			promise.then(function (players) {
				data.players = players;
				data.querying = false;
			});
		};
		
		data.setStage = function (id) {
			data.playerId = id;
		};
		data.resetStage = function () {
			data.playerId = undefined;
			console.log('Stage reset.')
		}
		
		data.clear = function () {
			data.players = [];
		};
		
		return data;
	};
	
	dataService.$inject = ["PlayerListService", "PlayerService"];
	
	angular.module('dashboard')
		.factory('DataService', dataService);

})();