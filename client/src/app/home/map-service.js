var mapServiceModule = angular.module('services.mapServiceModule', []);

mapServiceModule.service('MapService', ['uiGmapGoogleMapApi', function(GoogleMapApi) {
  var mapService = {};

  mapService.map = {
    isReady: false
  };


  mapService.mapPromise =
    GoogleMapApi.then(function(maps) {
      maps.visualRefresh = true;
      mapService.map = {
        center: {
          latitude: 45,
          longitude: -73
        },
        zoom: 8
      };
      mapService.map.isReady = true;
      return mapService.map;
    });


  return mapService;
}]);
