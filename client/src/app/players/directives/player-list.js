angular.module('areas.players.directives')

.directive('listPlayers',['PlayerComponents', function(PlayerComponents) {

  return {
    restrict: 'E',
    scope: {
      players: "="
    },
    link: function(scope, element, attrs) {
      var tableElement = React.render(<PlayerComponents.Table players={scope.players}/>, element[0]);
      scope.$watchCollection('players', function(newValue, oldValue) {
        tableElement.setState({players:newValue});
      })
    }
  }
}]);
