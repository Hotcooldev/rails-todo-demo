module.exports = angular.module('TodoApp.Auth.AuthController', [
    require('angular-ui-router'),
    require('./auth-service').name
])

.controller('AuthController', function($scope, AuthService, $state) {
    if (AuthService.isAuthed) {
        $state.go('authed');
    }

    $scope.auth = function(user) {
        if ($scope.authForm.$invalid) {
            return;
        }

        AuthService.auth(user.email, user.password, function() {
            $state.go('authed');
        });
    }
});

