(function () {
    "use strict";

    angular.module("myapp.services", []).factory("myappService", ["$rootScope", "$http", function ($rootScope, $http) {
        var myappService = {};

        //starts and stops the application waiting indicator
        myappService.wait = function (show) {
            if (show)
                $(".spinner").show();
            else
                $(".spinner").hide();
        };

        console.log("services initialized");
        return myappService;
    }])
    .factory('$popup', ["$ionicPopup", function ($ionicPopup) {
        return {
            getData: function (title, $scope) {
                return $ionicPopup.show({
                    template: '<input type="text" ng-model="data.text">',
                    title: title,
                    scope: $scope,
                    buttons: [
                      { text: 'Cancel' },
                      {
                          text: '<b>OK</b>',
                          type: 'button-positive',
                          onTap: function (e) {
                              if (!$scope.data.text) {
                                  //don't allow the user to close unless he enters wifi password
                                  e.preventDefault();
                              }
                          }
                      }
                    ]
                });
            }
        }
    }])
    ;
})();