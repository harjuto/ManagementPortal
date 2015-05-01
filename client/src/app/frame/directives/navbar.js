var NavigationDirective = function() {
  return {
    restrict: "E",
    replace: true,
    templateUrl: "/app/frame/directives/navigation.tpl.html",
    controller: "NavCtrl",
    controllerAs: "nav"
  };
};

var NavigationDirectiveController = function($route, $location) {
  var nav = this;
  nav.route = $route;
  nav.goto = function(path) {
    $location.path(path);
  };
};


NavigationDirectiveController.$inject = ["$route", "$location"];


angular.module('page.frame')
  .controller("NavCtrl", NavigationDirectiveController)
  .directive("navigation", NavigationDirective);
