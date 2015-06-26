(function () {
	var playerStore = function (PlayerListService, PlayerService) {

		var store = {
			players: [],
			showCount: 10,
			queryString: '',
			querying: false,
			playerId: ''
		};
		
		
		store.query = function (queryString) {
			store.querying = true;
			store.clear();
			PlayerListService.query(queryString)
				.then(function (players) {
				store.players = [players];
				store.querying = false;
			});
		};
		
		store.setStage = function (id) {
			store.playerId = id;
		};
		store.resetStage = function () {
			store.playerId = undefined;
		};
		
		store.clear = function () {
			store.players = [];
		};
		return store;
	};
	
	playerStore.$inject = ["PlayerListService", "PlayerService"];
	
	angular.module('dashboard')
		.factory('PlayerStore', playerStore);

})();