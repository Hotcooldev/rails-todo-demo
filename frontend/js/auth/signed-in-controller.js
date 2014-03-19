module.exports = angular.module('TodoApp.Auth.SignedInController', [
    require('angular-ui-router'),
    require('./auth-service').name
])

.controller('SignedInController', function($scope, AuthService) {
    $scope.signOut = function() {
        AuthService.signOut();
    };

    $scope._setEmailFromAuthCookie = function() {
        var userEmail = AuthService.authedEmailFromCookie();
        if (userEmail) {
            $scope.userEmail = userEmail;
        }
    };

    $scope._updateEmailOnSignIn = function() {
        AuthService.onSignIn.push(function() {
            $scope.userEmail = AuthService.userEmail;
        });
    };

    $scope._setEmailFromAuthCookie();
    $scope._updateEmailOnSignIn();
});

