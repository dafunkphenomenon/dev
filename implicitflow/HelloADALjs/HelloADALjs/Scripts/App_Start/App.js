var myApp = angular.module("MyApp", ["ngRoute", "AdalAngular"]);


myApp.config(["$routeProvider", "$httpProvider", "adalAuthenticationServiceProvider",
    function ($routeProvider, $httpProvider, adalProvider) {

        'use strict';

        //Initialize ADAL
        adalProvider.init({
            tenant: "oozoo.onmicrosoft.com",
            clientId: "7ca6b0c5-3ef4-4a01-87db-018347c17a9d",
            cacheLocation: "localStorage",
            endpoints: {
                'https://oozoo.sharepoint.com/_api/': 'https://oozoo.sharepoint.com',
                'https://oozoo-my.sharepoint.com/_api/v1.0/me': 'https://oozoo-my.sharepoint.com'
             }
        }, $httpProvider);

        //Configure routes
        $routeProvider.when("/", {
            controller: 'homeCtrl',
            templateUrl: 'Views/home.html',
            requireADLogin: true
        });
        $routeProvider.when("/documents", {
            controller: 'docsCtrl',
            templateUrl: 'Views/docs.html',
            requireADLogin: true
        });
        $routeProvider.otherwise({
            redirectTo: "/"
        });
    }
]);

