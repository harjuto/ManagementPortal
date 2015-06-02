(function() {
  var RewardDirective = function() {
    return {
      restrict: 'E',
      templateUrl: '/app/players/directives/player-actions/player-rewards.tpl.html',
      scope: {
        player: "="
      },
      controller: ["$scope","PlayerService","$route", function($scope, PlayerService, $route) {
        
        /**
         * Initialize values
         */
        resetValues();
        
        /**
         * Submit reward, called after submit is clicked in UI
         */
        $scope.submit = function () {
          $scope.loading = true;
          PlayerService.reward($scope.reward)
            .then(function () {
              reload();
            }, function () {
              alert("Something went wrong");
            });
        };
        
        /**
         * Called when clicking clear button in UI
         * Resets initial values
         */
        $scope.clear = function () {
          resetValues();
        };
        
        /**
         * Used to determine wether to disable submit button
         * Allow submitting only if Alloy or Stardust and message 
         */
        $scope.isValid = function () {
          return ($scope.reward.alloy || $scope.reward.stardust) && $scope.reward.message;
        };
        
        /**
         * Function which sets initial reward values
         */
        function resetValues() {
          $scope.reward = {
              alloy: 0,
              stardust: 0,
              message: undefined,
              playerId: $scope.player.id
          };
        }
        
        /**
         * Reload player data to show updated allow and stardust values
         */
        function reload() {
          PlayerService.show($scope.player.id)
            .then(function (data) {
            resetValues();
            $scope.player = data;
          });
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
      controller: ["$scope", "PlayerService", function ($scope, PlayerService) {
       
         /**
         * Initial loading
         */
        reload();
       
        /**
         * Called by clicking resolve button in Ui
         * Once finished, calls reload to refresh flags. 
         */
        $scope.resolve = function (playerId, flagId) {
          PlayerService.resolve(playerId, flagId)
            .then(function (data) {
            reload();
          });
        };
        
        /**
         * Reload flags
         */
        function reload() {
          PlayerService.flags($scope.player.id)
            .then(function (data) {
            $scope.flags = data;
          });
        };
        
      }]
    };
  }
  
  ResolveFlagsDirective.$inject = [];

  var PlayerBanDirective = function () {
    return {
      restrict: "E",
      replace: true,
      templateUrl: '/app/players/directives/player-actions/player-ban.tpl.html',
      scope: {
        player: "="
      },
      controller: ["$scope","PlayerService", function ($scope, PlayerService) {
        /**
         * Ban player
         */
        $scope.ban = function (playerId, doBan) {
          PlayerService.ban(playerId, doBan)
            .then(function (data) {
            reload();
           })
        }
         
       /**
        * Suspend player
        */
        $scope.suspend = function (playerId) {
          PlayerService.suspend(playerId)
            .then(function (data) {
            reload();
          });
        };
        
        /**
         * Reload player data to show updated ban/suspend status.
         */
        function reload() {
          PlayerService.show($scope.player.id)
            .then(function (data) {
            $scope.player = data;
          });
         }
      }]
    }
  };

  angular.module('areas.players')
    .directive('playerReward', RewardDirective)
    .directive('resolveFlags', ResolveFlagsDirective)
    .directive('playerBan', PlayerBanDirective);
})();
