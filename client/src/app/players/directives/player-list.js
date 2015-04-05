var ListPlayersDirective = function(PlayerComponents) {
    return {
      restrict: 'E',
      scope: {
        players: "="
      },
      link: function(scope, element, attrs) {
        var tableElement = React.render( < PlayerComponents.Table players = {
            scope.players
          }
          />, element[0]);
          scope.$watchCollection('players', function(newValue, oldValue) {
            tableElement.setState({
              players: newValue
            });
          })
        }
      }
    };

    ListPlayersDirective.$inject = ["PlayerComponents"];

    angular.module('areas.players.directives')

    .directive('listPlayers', ListPlayersDirective);
