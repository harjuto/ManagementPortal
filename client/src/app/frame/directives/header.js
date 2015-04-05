var HeaderDirective = function() {
  return {
    restrict: "E",
    replace: true,
    templateUrl: "/app/frame/directives/header.tpl.html",
    controller: "HeaderCtrl",
    controllerAs: "header"
  };
};

var HeaderDirectiveController = function($route, $location, UserAuthFactory, AuthenticationFactory) {
  var header = this;
  header.authFactory = AuthenticationFactory;
  header.gohome = function() {
    $location.path("/");
  };
  header.logout = function() {
    UserAuthFactory.logout();
  };
};



HeaderDirectiveController.$inject = ["$route", "$location", "UserAuthFactory", "AuthenticationFactory"];

angular.module('page.frame')
  .controller("HeaderCtrl", HeaderDirectiveController)
  .directive("header", HeaderDirective);
