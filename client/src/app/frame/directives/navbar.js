var NavigationDirective = function() {
  return {
    restrict: "E",
    replace: true,
    templateUrl: "/app/frame/directives/navigation.tpl.html",
    controller: "NavCtrl",
    controllerAs: "nav"
  };
};

var NavigationDirectiveController = function() {
  var nav = this;
 
};


NavigationDirectiveController.$inject = [];


angular.module('page.frame')
  .controller("NavCtrl", NavigationDirectiveController)
  .directive("navigation", NavigationDirective);
