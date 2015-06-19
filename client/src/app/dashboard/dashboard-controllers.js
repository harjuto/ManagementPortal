(function () {
  var dashboardController = function (DataService) {
    var dashboard = this;
    dashboard.DataService = DataService;
    DataService.resetStage();
    

  }
  dashboardController.$inject = ["DataService"];


  angular.module('dashboard')
    .controller("DashboardCtrl", dashboardController);

})();
