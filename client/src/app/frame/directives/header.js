var HeaderDirective = function() {
  return {
    restrict: "E",
    replace: true,
    templateUrl: "/app/frame/directives/header.tpl.html",
    controller: "HeaderCtrl",
    controllerAs: "header"
  };
};

var HeaderDirectiveController = function($scope, adalAuthenticationService) {
  var header = this;
  
  header.logout = function() {
    adalAuthenticationService.logOut();

  };
  header.login = function() {
    adalAuthenticationService.login();
  };
};



HeaderDirectiveController.$inject = ["$scope", "adalAuthenticationService"];

angular.module('page.frame',[])
  .controller("HeaderCtrl", HeaderDirectiveController)
  .directive("header", HeaderDirective);