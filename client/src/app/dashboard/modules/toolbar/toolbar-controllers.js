(function () {
  var toolbarController = function (DataService, PlayerListService) {
    var toolbar = this;
    toolbar.DataService = DataService;

  };

  toolbarController.$inject = ["DataService", "PlayerListService"]

  angular.module('toolbar')
    .controller('ToolbarCtrl', toolbarController);
})();