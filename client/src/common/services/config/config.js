angular.module('services.config', [])

.factory('ConfigService', [function(){
	var config = {
		"baseUrl": "http://localhost:1337/",
		"client": {
			"clientId" : "miiter",
			"clientSecret": "salaisuus"
		},
		"api": {
			"baseUrl": "http://localhost:1337/api/",
			"userInfo": "users/userInfo/",
			"users": "users/"
		},
		"auth":{
			"login": "oauth/token",
			"signup": "signup"
		}
	};

	function getBaseUrl(){
		return config.basrUrl;
	}

	function getApiUrl(endpoint){
		return typeof(endpoint) === 'undefined' ? 
			config.api.baseUrl :
			config.api.baseUrl + config.api[endpoint];
	}

	function getAuthUrl(endpoint){
		return typeof(endpoint) === 'undefined' ? 
			config.baseUrl + config.auth.login :
			config.baseUrl + config.auth[endpoint];
	}


	return {
		json: config,
		getBaseUrl: getBaseUrl,
		getApiUrl: getApiUrl,
		getAuthUrl: getAuthUrl
	};
}]);