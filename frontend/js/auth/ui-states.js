module.exports = angular.module('TodoApp.Auth.UiStates', [
    require('angular-ui-router'),
    require('./auth-service').name
])

.config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/");

    $stateProvider
        .state('anonymous', {
            url: '/',
            views: {
                'TodoApp.Auth.UiStates.Navbar': {
                    templateUrl: 'auth/navbar/signin'
                }
            }
        })
        .state('authed', {
            url: '/todos',
            views: {
                'TodoApp.Auth.UiStates.Navbar': {
                    templateUrl: 'auth/navbar/authed'
                }
            },
            onEnter: function($state, AuthService) {
                if (!AuthService.isAuthed) {
                    $state.go('anonymous');
                }
            }
        })
    ;
});
