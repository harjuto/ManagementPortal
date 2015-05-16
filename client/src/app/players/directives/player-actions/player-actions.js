(function() {
  var PlayerRewardDirective = function() {
    return {
      restrict: 'E',
      templateUrl: '/app/players/directives/player-actions/player-rewards.tpl.html',
      scope: {
        player: "="
      },
      controller: ["$scope","PlayerService", function($scope, PlayerService) {
        $scope.alloy = 500;
        $scope.stardust = 500;
        $scope.msg = "";
        
        $scope.confirmedValues = {
          alloy: $scope.alloy,
          stardust: $scope.stardust,
          msg: $scope.msg
        };

        $scope.waitingForConfirmation = false;
        
        $scope.submit = function () {
          $scope.confirmedValues.alloy = $scope.alloy;
          $scope.confirmedValues.stardust = $scope.stardust;
          $scope.confirmedValues.msg = $scope.msg;
  	   
          console.log($scope.confirmedValues);
          $scope.waitingForConfirmation = true;
        };
        $scope.confirm = function () {
          $scope.alloy = 500;
          $scope.stardust = 500;
          $scope.msg = '';
          $scope.waitingForConfirmation = false;
          //PlayerService.reward($scope.confirmedValues);
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
