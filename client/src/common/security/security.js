angular.module('services.security', [])

.factory('AuthenticationService', ['$localStorage', '$location', function($localStorage, $location) {
    return {
        isAuthenticated: function(){
            return $localStorage.loginInfo !== null && !angular.isUndefined($localStorage.loginInfo);
        },
        userInfo: function(){
            return $localStorage.loginInfo;
        },
        logout: function(){
            delete $localStorage.loginInfo;
            $location.path("/");
        },
        login: function(userInfo){
            $localStorage.loginInfo = userInfo;
        },
        getToken: function(){
            if($localStorage.loginInfo === null)
                return '';
            return $localStorage.loginInfo.access_token;
        },
        getRefreshToken: function(){
            if($localStorage.loginInfo === null)
                return '';
            return $localStorage.loginInfo.refresh_token;
        }
    };
}])

.factory('UserService', ['$http', 'LoginModelFactory', 'AuthenticationService', 'ConfigService', '$q', 
    function($http, LoginModelFactory, AuthenticationService, config, $q){
    return {
        login: function(user){
            var defer = $q.defer();
            $http.post(config.getAuthUrl(), LoginModelFactory.loginModel(user)).then(function(result){
                AuthenticationService.login(result.data);
                defer.resolve();
            }, function(reason){
                console.error("loginerror", reason)
                if(reason.status == 403)
                    defer.reject("Username or password incorrect");
                else
                    defer.reject("There is a problem with our login service");
            });

            return defer.promise;
        },
        userInfo: function(){
            if(AuthenticationService.isAuthenticated())
                return $http.get(config.getApiUrl('userInfo'));
        },
        updateInfo: function(user){
            return $http.post(config.getApiUrl('userInfo'), user);
        },
        signup: function(user){
            var defer = $q.defer();
            $http.post(config.getAuthUrl('signup'), LoginModelFactory.signupModel(user)).then(function(result){
                defer.resolve();
            }, function(reason){
                defer.reject("no bonus");
            });
            return defer.promise;
        }
    };
}])

.factory('LoginModelFactory', ['AuthenticationService', 'ConfigService', function(AuthenticationService, config){
    return {
        refreshModel: function(){
            return {
                grant_type: 'refresh_token',
                client_id: config.json.client.clientId,
                client_secret: config.json.client.clientSecret,
                refresh_token: AuthenticationService.getRefreshToken()
            };
        },
        loginModel: function(user){
            return {
                grant_type: 'password',
                client_id: config.json.client.clientId,
                client_secret: config.json.client.clientSecret,
                username: user.username,
                password: user.password
            };
        },
        signupModel: function(user){
            return {
                username: user.username,
                password: user.password
            };
        }
    };
}])

.factory('TokenInterceptor', ['$q', '$window', '$location', 'AuthenticationService', function ($q, $window, $location, AuthenticationService) {
    return {
        request: function (config) {
            config.headers = config.headers || {};
            if (AuthenticationService.isAuthenticated() ) {
                config.headers.Authorization = 'Bearer ' + AuthenticationService.getToken();
            }
            return config;
        },

        requestError: function(rejection) {
            return $q.reject(rejection);
        },

        /* Set Authentication.isAuthenticated to true if 200 received */
        response: function (response) {
            if (response !== null && response.status == 200 && !AuthenticationService.isAuthenticated() ) {
                
            }
            return response || $q.when(response);
        },

        /* Revoke client authentication if 401 is received */
        responseError: function(rejection) {

            console.log("reject", rejection);

            if (rejection !== null && rejection.status === 401 && AuthenticationService.isAuthenticated() ) {
                AuthenticationService.logout();
            }
            return $q.reject(rejection); 
        }
    };
}]);