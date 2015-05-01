var HeaderDirective = function() {
  return {
    restrict: "E",
    replace: true,
    templateUrl: "/app/frame/directives/header.tpl.html",
    controller: "HeaderCtrl",
    controllerAs: "header"
  };
};

var HeaderDirectiveController = function($scope, $route, $location, adalAuthenticationService) {
  var header = this;
  header.gohome = function() {
    $location.path("/");
  };
  header.logout = function() {
    adalAuthenticationService.logOut();

  };
  header.login = function() {
    adalAuthenticationService.login();
  };
};



HeaderDirectiveController.$inject = ["$scope", "$route", "$location", "adalAuthenticationService"];

angular.module('page.frame')
  .controller("HeaderCtrl", HeaderDirectiveController)
  .directive("header", HeaderDirective);