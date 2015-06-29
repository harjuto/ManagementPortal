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
        },
        'content@dashboard': {
  	       templateUrl: '/app/dashboard/modules/table/table.tpl.html',
        }


      }
    });



  });
})();