module.exports = angular.module('TodoApp.Auth.AuthFormController', [
    require('angular-ui-router'),
    require('./auth-service').name
])

.controller('AuthFormController', function($scope, $element, $timeout, AuthService) {
    $scope.authValidationError = null;
    $scope.signIn = function(user, authForm) {
        if (authForm.$invalid) {
            return;
        }

        var registerResult = AuthService.register(user.email, user.password);

        $scope.authValidationError = null;
        registerResult.error(function(response) {
            if (!response.data
                || !response.data.email
                || !response.data.email[0]
                || response.data.email[0] !== 'has already been taken'
            ) {
                // Unknown error
                $scope.authValidationError = 'Sign-in failed';
                return;
            }

            // If registration fails, try signing in instead
            var signInResult = AuthService.signIn(user.email, user.password);

            $scope.authValidationError = null;
            signInResult.error(function(response) {
                if (response.title === 'Invalid Credentials') {
                    $scope.authValidationError = 'Invalid email or password';
                } else {
                    $scope.authValidationError = 'Sign-in failed';
                }
            });
        });

        $scope._getValidationContainer = function() {
            return $element.find('.auth-validation-container')[0];
        };

        $scope.validationErrorEvent = 'authValidationErrorEvent';
        $scope._alreadyShowingError = false;
        $scope._triggerValidationErrorEvent = function() {
            $timeout(function() { // this prevents us from triggering a digest while one might already be in progress
                if ($scope._alreadyShowingError) {
                    return;
                }

                var event = document.createEvent('Events');
                event.initEvent($scope.validationErrorEvent, true, true);

                // Dispatch tooltip event so its shown to the user
                $scope._getValidationContainer().dispatchEvent(event);
                $scope._alreadyShowingError = true;
            });
        };

        $scope.$watch('authValidationError', function(error) {
            if (error) {
                $scope._triggerValidationErrorEvent();
            }
        });
    };

    $scope.isInvalid = function(input) {
        return $scope.authForm[input].$invalid && $scope.authForm[input].$dirty;
    };
});

