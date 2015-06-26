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
        'content@dashboard': {
          templateUrl: '/app/dashboard/modules/table/table.tpl.html',
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
        'content@dashboard': {
          templateUrl: '/app/dashboard/modules/table/table.tpl.html',
          controller: "AllianceCtrl",
          controllerAs: "alliance"
        }
       
      }
    });
    

  });
})();