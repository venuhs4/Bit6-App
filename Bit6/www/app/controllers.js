(function () {
    "use strict";

    angular.module("myapp.controllers", ['ngCordova'])

    .controller("appCtrl", ["$scope", function ($scope) {
        console.log("appCtrl initialized");
    }])
    .controller("homeCtrl", ["$scope", "$state", "$popup", function ($scope, $state, $popup) {
        console.log("ionic controller");
        $scope.conversations = getLocalObject("conversations");
        $scope.refresh = function () {
            //$scope.$broadcast("scroll.refreshComplete");
            console.log(b6);
            $scope.conversations = b6.conversations;
        };
        b6Events.addEventListener("onSignIn", function () {
            $scope.conversations = b6.conversations;
        });
        b6Events.addEventListener("onConversation", function () {
            $scope.conversations = b6.conversations;
        });

        $scope.createChat = function () {
            $scope.data = {};
            $popup.getData('Enter user', $scope).then(function () {
                console.log($scope.data.text);
                if (!angular.isUndefined($scope.data.text) && $scope.data.text != "") {
                    sendMessage($scope.data.text);
                    $scope.conversations = b6.conversations;
                }
            });
        };
        $scope.gotoChat = function (key) {
            $state.go('app.chat', { key: key });
        }
    }])
    .controller("chatCtrl", ["$scope", "$state", "$popup","$stateParams", function ($scope, $state, $popup,$stateParams) {
        $scope.chat = b6.conversations[$stateParams.key].messages;
        $scope.data = {
            message: ""
        };
        $scope.refresh = function () {
            $scope.chat = b6.conversations[$stateParams.key].messages;
        };

        b6Events.addEventListener("onConversation", function () {
            $scope.chat = b6.conversations[$stateParams.key].messages;
        });
        $scope.sendMessage = function () {
            if($scope.data.message.length > 0)
            {
                sendMessage($stateParams.key.replace(/^usr:/, ""),$scope.data.message);
            }
        };
    }])
    .controller('loginCtrl', ['$scope', '$state', function ($scope, $state) {

        $scope.data = { user: getLocalObject('user') == undefined ? "" : getLocalObject('user').usr }
        $scope.signIn = function () {
            if (signIn($scope.data.user, '1234')) {
                $state.go("app.home");
            }
        };
        $scope.signUp = function () {
            if (isDevice()) {
                navigator.notification.confirm("Are you sure you want to Sign Up as a new user?", function (button) {
                    if (button == 1) {
                        if (signUp($scope.data.user, '1234')) {
                            $state.go("app.home");
                        }
                    }
                }, "Sign Up Confirm", "Yes,No");
            }
            else {
                if (signUp($scope.data.user, '1234')) {
                    $state.go("app.home");
                }
            }
        };
    }])
})();