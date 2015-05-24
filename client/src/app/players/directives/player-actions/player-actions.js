(function() {
  var RewardDirective = function() {
    return {
      restrict: 'E',
      templateUrl: '/app/players/directives/player-actions/player-rewards.tpl.html',
      scope: {
        player: "="
      },
      controller: ["$scope","PlayerService","$route", function($scope, PlayerService, $route) {
        //Set initial values
        resetValues();
        $scope.submit = function () {
          $scope.loading = true;
          PlayerService.reward($scope.reward)
            .then(function () {
            	alert("Success");
              $route.reload();
            }, function () {
              alert("Something went wrong");
            });
        };
        
        $scope.clear = function () {
          //Reload empty values
          resetValues();
        };
        
      
        $scope.isValid = function () {
          return ($scope.reward.alloy || $scope.reward.stardust) && $scope.reward.message;
        };
        
        function resetValues() {
          $scope.reward = {
              alloy: 0,
              stardust: 0,
              message: undefined,
              playerId: $scope.player.id
          };
        }
      
      }]
    };
  };

  RewardDirective.$inject = [];



  var ResolveFlagsDirective = function () {
    return {
      restrict: 'E',
      templateUrl: '/app/players/directives/player-actions/player-resolve-flags.tpl.html',
      scope: {
        player: '='
      },
      controller: ["$scope", function ($scope) {

      }]
    };
  }
  
  ResolveFlagsDirective.$inject = [];

  angular.module('areas.players.directives')
    .directive('playerReward', RewardDirective)
    .directive('resolveFlags', ResolveFlagsDirective);
    
})();
