(function () {

  /**
   * This controls the stage frame, handles refreshing when new player clicked.
   */
  var StageFrameDirective = function () {
    return {
      restrict: 'E',
      replace: false,
      templateUrl: '/app/dashboard/modules/stage/stage-frame.tpl.html',
      controller: 'StageMainCtrl',
      controllerAs: 'stage'
    };
  };

  /**
   * Handles player rewarding related funtions
   */
  var RewardDirective = function () {
    return {
      restrict: 'E',
      templateUrl: '/app/dashboard/modules/stage/player-rewards.tpl.html',
      scope: {
        player: '='
      },
      controller: ['$scope', 'PlayerService', function ($scope, PlayerService) {
        $scope.$watch('player.id', function (newPlayer, oldPlayer) {
          resetValues(newPlayer);
        });
        
        /**
         * Submit reward, called after submit is clicked in UI
         */
        $scope.submit = function () {
          $scope.loading = true;
          PlayerService.reward($scope.reward)
            .then(function () {
            alert('Reward sent succesfully');
          }, function () {
              alert('Something went wrong');
            });
        };
        
        /**
         * Called when clicking clear button in UI
         * Resets initial values
         */
        $scope.clear = function () {
          resetValues($scope.player);
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
        function resetValues(player) {
          $scope.reward = {
            alloy: 0,
            stardust: 0,
            message: undefined,
            playerId: player.id
          };
        }

      }]
    };
  };

  RewardDirective.$inject = [];

  var ResolveFlagsDirective = function () {
    return {
      restrict: 'E',
      templateUrl: '/app/dashboard/modules/stage/player-resolve-flags.tpl.html',
      scope: {
        player: '='
      },
      controller: ['$scope', 'PlayerService', function ($scope, PlayerService) {

        $scope.$watch('player.id', function (newId, oldId) {
          if (newId) {
            reload(newId);
          }
        });
        /**
         * Called by clicking resolve button in Ui
         * Once finished, calls reload to refresh flags. 
         */
        $scope.resolve = function (playerId, flagId) {
          PlayerService.resolve(playerId, flagId)
            .then(function (data) {
            reload(playerId);
          });
        };
        
        /**
         * Reload flags
         */
        function reload(id) {
          PlayerService.flags(id)
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
      restrict: 'E',
      replace: true,
      templateUrl: '/app/dashboard/modules/stage/player-ban.tpl.html',
      scope: {
        login: '='
      },
      controller: ['$scope', 'PlayerService', function ($scope, PlayerService) {
        /**
         * Ban player
         */
        $scope.ban = function (playerId, doBan) {
          PlayerService.ban(playerId, doBan)
            .then(function (data) {
            reload();
          });
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
          PlayerService.show($scope.login.playerId)
            .then(function (data) {
            $scope.login = data.login;
          });
        }
      }]
    };
  };
  
  var playerAllianceDirective = function () {
    return {
      restrict: 'E',
      replace: false,
      templateUrl:'/app/dashboard/modules/stage/player-alliance.tpl.html',
      scope: {
        allianceId: '='
      },
      controller: ['$scope', 'AllianceService', function ($scope, AllianceService) {
        $scope.$watch('allianceId', function (newId, oldId) {
          AllianceService.players(newId)
            .then(function (data) {
              $scope.alliancePlayers = data;
            });
        });
      }]
    };
  };

  angular.module('stage')
    .directive('stageFrame', StageFrameDirective)
    .directive('playerReward', RewardDirective)
    .directive('resolveFlags', ResolveFlagsDirective)
    .directive('playerBan', PlayerBanDirective)
    .directive('playerAlliance', playerAllianceDirective);
})();
