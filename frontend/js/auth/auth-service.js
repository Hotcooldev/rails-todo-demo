require('angular-cookie');

module.exports = angular.module('TodoApp.Auth.AuthService', [
    require('./session').name,
    'ivpusic.cookie'
])

.factory('AuthService', function(Session, $q, $state, ipCookie) {
    function createCookie(userEmail) {
        ipCookie('authedUserEmail', userEmail);
    }

    function hasSession() {
        return ipCookie('authedUserEmail');
    }

    function resetAuth(AuthService) {
        AuthService.isAuthed = false;
        AuthService.userEmail = null;
        createCookie(null);

        $state.go('anonymous');
    }

    function callEventHandlers(callbacks) {
        for(var i = 0; i < callbacks.length; ++i) {
            callbacks[i]();
        }
    }

    var module = {
        isAuthed: false,
        userEmail: null,

        onSignIn: [],
        onSignOut: [],

        signIn: function(email, password) {
            var context = this;
            var session = Session.create();

            var promise = session.signIn(email, password);

            promise
                .success(function(response) {
                    context.isAuthed = true;
                    context.userEmail = response.data.userEmail;

                    createCookie(context.userEmail);

                    $state.go('authed');

                    callEventHandlers(context.onSignIn);
                })
                .error(function(response) {
                    resetAuth(context);

                    callEventHandlers(context.onSignOut);
                })
            ;
            
            return promise;
        },

        reload: function() {
            if (hasSession()) {
                this.signIn();
            }
        },
        
        signOut: function() {
            var session = Session.create();

            var promise = session.signOut();

            resetAuth(this);

            callEventHandlers(this.onSignOut);

            return promise;
        }
    };

    module.reload(); // Try to re-authenticate using session upon initialization

    return module;
});
