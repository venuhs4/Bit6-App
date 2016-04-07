(function () {
    "use strict";

    angular.module("myapp", ["ionic", "myapp.controllers", "myapp.services"])
        .run(function ($ionicPlatform, $rootScope) {
            $ionicPlatform.ready(function () {
                if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
                    cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                }
                if (window.StatusBar) {
                    StatusBar.styleDefault();
                }
                console.log("ionic platform ready");
            });
            console.log("ionic run");
            //b6.on('conversation', function (c, op) {
            //    $rootScope.$broadcast('onConversation', { op: op });
            //});
        })
        .config(function ($stateProvider, $urlRouterProvider) {
            console.log("ionic config");
            $stateProvider
            .state("app", {
                url: "/app",
                abstract: true,
                templateUrl: "app/templates/view-menu.html",
                controller: "appCtrl"
            })
            .state("app.home", {
                url: "/home",
                templateUrl: "app/templates/view-home.html",
                controller: "homeCtrl"
            })
            .state('login', {
                url: '/login',
                templateUrl: 'app/templates/view-login.html',
                controller: 'loginCtrl'
            })
            .state('app.chat', {
                url: '/chat',
                params: { key: '' },
                templateUrl: 'app/templates/view-chat.html',
                controller: 'chatCtrl'
            })
            ;

            if (!angular.isUndefined(getLocalObject('user')) && getLocalObject('user').loggedIn == true) {
                $urlRouterProvider.otherwise("/app/home");
            }
            else {
                $urlRouterProvider.otherwise("/login");
            }
        });
})();