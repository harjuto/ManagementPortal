(function () {
  angular.module('dashboard', [
    'table',
    'toolbar',
    'stage',
    'alliance'
  ])
    .config(function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/dashboard');

    $stateProvider
      .state('dashboard', {
      url: '/dashboard',
      views: {
        '': {
          templateUrl: '/app/dashboard/dashboard.tpl.html',
          controller: "DashboardCtrl",
          controllerAs: 'dashboard',
        },
        'toolbar@dashboard': {
          templateUrl: '/app/dashboard/modules/toolbar/toolbar.tpl.html',
          controller: "ToolbarCtrl",
          controllerAs: "toolbar",
        },
        'table@dashboard': {
          templateUrl: '/app/dashboard/modules/table/table.tpl.html',
          controller: "TableCtrl",
          controllerAs: "table"
        },
        'stage@dashboard': {
          templateUrl: '/app/dashboard/modules/stage/stage.tpl.html',
          controller: "StageCtrl",
          controllerAs: "stage"
        }
       
      }
      })
    .state('dashboard.alliance', {

      views: {
        '': {
          templateUrl: '/app/dashboard/dashboard.tpl.html',
          controller: "DashboardCtrl",
          controllerAs: 'dashboard',
        },
        'toolbar@dashboard': {
          templateUrl: '/app/dashboard/modules/alliance/alliance-header.tpl.html',
          controller: "AllianceToolbarCtrl",
          controllerAs: "toolbar"
        },
        'table@dashboard': {
          templateUrl: '/app/dashboard/modules/table/table.tpl.html',
          controller: "AllianceCtrl",
          controllerAs: "alliance"
        },
        'stage@dashboard': {
          templateUrl: '/app/dashboard/modules/stage/stage.tpl.html',
          controller: "StageCtrl",
          controllerAs: "stage"
        }
       
      }
    });
    

  });
})();