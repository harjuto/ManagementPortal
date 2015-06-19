(function(){
  'use strict';

var SearchBoxDirective = function () {
  return {
    restrict: 'E',
    templateUrl: '/app/players/directives/player-list/search-box.tpl.html'
  };
};

SearchBoxDirective.$inject = [];

var ListBoxDirective = function () {
  return {
    restrict: 'E',
    templateUrl: '/app/players/directives/player-list/list-box.tpl.html',
    scope: {
      list: '='
    }
  };
};

var SearchToolsDirective = function () {
  return {
    restrict: 'E',
    templateUrl: '/app/players/directives/player-list/search-tools.tpl.html'
  };
};



var ValueFilter = function(){
  return function(input) {
    input = input || '';
    if(input == "false" || input == "0"){
      input = '';
    }

    return input;
  };
};

angular.module('areas.players')
    .directive('listBox', ListBoxDirective)
    .directive('searchTools', SearchToolsDirective)
    .filter('valueFilter', ValueFilter);
    
})();