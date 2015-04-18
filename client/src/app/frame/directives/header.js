var HeaderDirective = function() {
  return {
    restrict: "E",
    replace: true,
    templateUrl: "/app/frame/directives/header.tpl.html",
    controller: "HeaderCtrl",
    controllerAs: "header"
  };
};

var HeaderDirectiveController = function($route, $location, UserAuthFactory, AuthenticationStorage) {
  var header = this;
  header.authStorage = AuthenticationStorage;
  header.gohome = function() {
    $location.path("/");
  };
  header.logout = function() {
    UserAuthFactory.logout();
  };
};



HeaderDirectiveController.$inject = ["$route", "$location", "UserAuthFactory", "AuthenticationStorage"];

angular.module('page.frame')
  .controller("HeaderCtrl", HeaderDirectiveController)
  .directive("header", HeaderDirective);