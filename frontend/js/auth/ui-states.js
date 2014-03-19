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
                },
                'TodoApp.Auth.UiStates.Content': {
                    templateUrl: 'home/welcome'
                }
            },
            onEnter: function($state, AuthService) {
                if (AuthService.isAuthed) {
                    $state.go('authed');
                }
            }
        })
        .state('authenticating', {
            url: '/authenticating',
            views: {
                'TodoApp.Auth.UiStates.Navbar': {
                    templateUrl: 'auth/navbar/authed'
                },
                'TodoApp.Auth.UiStates.Content': {
                    templateUrl: 'auth/authenticating-content'
                }
            },
            onEnter: function($state, AuthService) {
                if (AuthService.isAuthed) {
                    $state.go('authed');
                }
            }
        })
        .state('authed', {
            url: '/todos',
            views: {
                'TodoApp.Auth.UiStates.Navbar': {
                    templateUrl: 'auth/navbar/authed'
                },
                'TodoApp.Auth.UiStates.Content': {
                    templateUrl: 'todos/todos'
                }
            },
            onEnter: function($state, AuthService) {
                if (!AuthService.isAuthed) {
                    if (AuthService.authedEmailFromCookie()) {
                        $state.go('authenticating');
                    } else {
                        $state.go('anonymous');
                    }
                }
            }
        })
    ;
});
