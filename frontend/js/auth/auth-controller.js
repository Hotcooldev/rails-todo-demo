module.exports = angular.module('TodoApp.Auth.AuthController', [
    require('angular-ui-router'),
    require('./auth-service').name
])

.controller('AuthController', function($scope, AuthService) {
    AuthService.onSignIn.push(function() {
        $scope.userEmail = AuthService.userEmail;
    });

    $scope.signIn = function(user, authForm) {
        if (authForm.$invalid) {
            return;
        }

        AuthService.signIn(user.email, user.password);
    };

    $scope.signOut = function() {
        AuthService.signOut();
    };
});

