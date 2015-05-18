(function() {
  var PlayerRewardDirective = function() {
    return {
      restrict: 'E',
      templateUrl: '/app/players/directives/player-actions/player-rewards.tpl.html',
      scope: {
        player: "="
      },
      controller: ["$scope","PlayerService", function($scope, PlayerService) {
        $scope.Alloy = 500;
        $scope.Stardust = 500;
        $scope.Message = "";
        
        $scope.confirmedValues = {
          Alloy: $scope.Alloy,
          Stardust: $scope.Stardust,
          Message: $scope.Message,
          PlayerId: $scope.player.id
        };

        $scope.waitingForConfirmation = false;
        
        $scope.submit = function () {
          $scope.confirmedValues.Alloy = $scope.Alloy;
          $scope.confirmedValues.Stardust = $scope.Stardust;
          $scope.confirmedValues.Message = $scope.Message;
          $scope.waitingForConfirmation = true;
        };
        $scope.confirm = function () {
          $scope.Alloy = 500;
          $scope.Stardust = 500;
          $scope.Message = '';
          $scope.waitingForConfirmation = false;
          PlayerService.reward($scope.confirmedValues);
        };
        $scope.cancel = function () {
          $scope.waitingForConfirmation = false;
          
        }
      }]
    };
  };

  PlayerRewardDirective.$inject = [];
  angular.module('areas.players.directives')
    .directive('playerReward', PlayerRewardDirective);
    
})();
