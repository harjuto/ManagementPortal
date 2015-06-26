(function () {
  var dashboardController = function (PlayerStore) {
    var dashboard = this;
    dashboard.PlayerStore = PlayerStore;
    PlayerStore.resetStage();


  };
  dashboardController.$inject = ["PlayerStore"];


  angular.module('dashboard')
    .controller("DashboardCtrl", dashboardController);

})();
