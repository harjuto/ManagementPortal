(function () {
  var toolbarController = function (PlayerStore, PlayerListService) {
    var toolbar = this;
    toolbar.PlayerStore = PlayerStore;

  };

  toolbarController.$inject = ["PlayerStore", "PlayerListService"]

  angular.module('toolbar')
    .controller('ToolbarCtrl', toolbarController);
})();