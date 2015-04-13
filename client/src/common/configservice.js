angular.module('ConfigService', [])
  .factory("ConfigService", function() {
    var ConfigService = {};

    ConfigService.config = {
      apiBaseURL: 'http://localhost:1337/api/'
    };


    return ConfigService;
  });
