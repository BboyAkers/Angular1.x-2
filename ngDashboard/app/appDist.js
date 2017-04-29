'use strict';

// Declare app level module which depends on views, and components
 var app = angular.module('myDash', ['ui.router']);

app.config(['$locationProvider','$stateProvider', function ($locationProvider, $stateProvider) {

    $locationProvider.html5Mode(true);

    $stateProvider
        .state('home', {
            url: '/',
            templateUrl: '/views/home/home.html',
            controller: 'HomeController',
            controllerAs: 'home'
        })
        .state('portfolio', {
            url: '/portfolio',
            templateUrl: '/views/portfolio/portfolio.html',
            controller: 'PortfolioController',
            controllerAs: 'portfolio'
        })
        .state('invoicing', {
            url: '/invoicing',
            templateUrl: '/views/invoicing/invoicing.html',
            controller: 'InvoiceController',
            controllerAs: 'invoice'
        })
        .state('email', {
            url: '/email',
            templateUrl: '/views/email/email.html',
            controller: 'EmailController',
            controllerAs: 'email'
        })
        .state('news', {
            url: '/news',
            templateUrl: '/views/news/news.html',
            controller: 'NewsController',
            controllerAs: 'news'
        });

}]);

'use strict';
angular.module('myDash')
    .service('githubService', ['$http', githubService]);

function githubService($http) {

    this.getRepos = function () {
        return $http({
            method: 'GET',
            //Production URL
            url: 'https://api.github.com/users/BboyAkers/repos'

            //Dev URL
            //url:'json/githubRepos.json',
        })
            .then(function (response) {
                var data = response.data;

                if (typeof data === "string") {
                    data = JSON.parse(data);
                }
                data = {repos: data};
                console.log(data);
                return data;
            });
    };

    this.getAvatar = function () {
        return this.getRepos().then(function (data) {
            return data.repos[0].owner.avatar_url;
        });
    };
    this.getRepoInfo = function () {
        return this.getRepos().then(function (data) {
            return data.repos;
        });
    };


    return this;
}

'use strict';
angular.module('myDash')
    .service('weatherService', ['$http', weatherService]);

function weatherService($http) {

    this.getWeather = function () {
        return $http({
            method: 'GET',
            //Production URL
            url: 'http://api.openweathermap.org/data/2.5/weather?zip=75093',

            //Dev URL
            //url: 'json/weather.json',
            params: {
                mode: 'json',
                units: 'imperial',
                appid: 'f524e1aeeaeba7e6399719841c3ab164'
            }
        })
            .then(function (response) {
                var data = response.data;

                if (typeof data === "string") {
                    data = JSON.parse(data);
                }
                data = {weather: data};
                console.log(data)
                return data;
            });
    };

    this.getWeatherTemp = function () {
        return this.getWeather().then(function (data) {
            return data.weather.main.temp;
        });
    };
    
    this.getWeatherDescription = function () {
        return this.getWeather().then(function (data) {
            return data.weather.weather[0].description;
        });
    };


    return this;
}


(function() {
    'use strict';
    angular.module('myDash')
        .controller('HomeController', ['$scope', 'githubService', 'weatherService', HomeController]);


function HomeController($scope, githubService, weatherService) {
    var vm = this;

    githubService.getAvatar().then(function(avatar_url) {
        $scope.githubAvatar = avatar_url;
    });
    githubService.getRepoInfo().then(function(repos) {
        $scope.githubRepo = repos;
    });

    //TODO: Need to debug

    weatherService.getWeatherTemp().then(function (temp) {
        $scope.weatherTemp =  temp;
    });

    weatherService.getWeatherDescription().then(function(desc){
        $scope.weatherDesc = desc;
    });


}
     HomeController.$inject = [];

}());
(function(){
    'use strict';
    angular.module('myDash')

        .controller('EmailController', EmailController);

    function EmailController() {
        var vm = this;
    }

    EmailController.$inject = [];

}());
(function() {
    'use strict';
    angular.module('myDash')
    
        .controller('NewsController', NewsController);

    function NewsController() {
        var vm = this;
    }


    NewsController.$inject = [];
}());
(function() {
    'use strict';
    angular.module('myDash')

        .controller('PortfolioController', PortfolioController);


    function PortfolioController() {
        var vm = this;

    }


    PortfolioController.$inject = [];

}());