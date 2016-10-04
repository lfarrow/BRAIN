(function() {
    'use strict';

    angular.module('brainApp.Controllers', ['brainApp.Services']);
    angular.module('brainApp.Services', []);
    angular.module('brainApp.Directives', []);

    angular.module('brainApp', [
        'ui.router',
        'ngCookies',
        'brainApp.Controllers',
        'brainApp.Services',
        'brainApp.Directives'
    ]);

    angular.module('brainApp')
    	.constant('app_constants', {
            "dev_key": "vBgcE4xoL2BDAfvR",
            "dev_id": "222",
            "api_url": "https://api.blackoutrugby.com/?"
        })
        .config(function($stateProvider, $urlRouterProvider, $locationProvider) {
            $urlRouterProvider.rule(function($injector, $location) {
                var path = $location.path();
                var hasTrailingSlash = path[path.length-1] === '/';

                if(hasTrailingSlash) {
                  //if last charcter is a slash, return the same url without the slash  
                  var newPath = path.substr(0, path.length - 1); 
                  return newPath; 
                } 
            });
            $urlRouterProvider.otherwise('root');

            $stateProvider
                .state('root', {
                    url: '',
                    title: 'Home',
                    templateUrl: 'app/home/home.html',
                    controller: 'homeController as homeCtrlVm',
                    data: {
                       bodyClass: 'home'
                   }
                })
                .state('home', {
                    url: '/',
                    title: 'Home',
                    templateUrl: 'app/home/home.html',
                    controller: 'homeController as homeCtrlVm',
                    data: {
                       bodyClass: 'home'
                   }
                })
                .state('location', {
                    url: '/location',
                    title: 'Select your location',
                    templateUrl: 'app/location/location.html',
                    controller: 'locationController as locationVm',
                    data: {
                       bodyClass: 'location'
                   }
                })
                .state('currentWeather', {
                    url: '/location/:locationId',
                    title: 'Current Weather',
                    templateUrl: 'app/currentWeather/currentWeather.html',
                    controller: 'currentWeatherController as currentWeatherVm',
                    data: {
                       bodyClass: 'currentWeather'
                   }
                })
                .state('otherwise', {
                    url: '*path',
                    templateUrl: 'app/home/home.html',
                    title: 'Page Not Found',
                    controller: 'homeController as mainCtrlVm',
                    data: {
                       bodyClass: 'home'
                   }
                });
        })
        .controller('appController', appController);

    function appController($scope, $rootScope, $http, $q, app_constants, apiServices) {
        console.log('lol');

        apiServices.makeRequest().then(function(response){
        	console.log(response);
        });
    };

})();

angular.module('brainApp.Services')
.factory('apiServices', apiServices);
	function apiServices($http, $q, app_constants){
        function makeRequest() {
        	var json = {};
        	json.d= app_constants.dev_id;
			json.dk= app_constants.dev_key;
			json.r= "m";
			json.memberid= "69757";
			json.json = 1;
        	
        	var jsonUrl = encodeURIComponent(JSON.stringify(json));

            var newUrl = app_constants.api_url + "json=" + jsonUrl;

            var def = $q.defer();
            def.resolve($http.get(newUrl));
            return def.promise;
        }

        return {
		    makeRequest: makeRequest
		}
};