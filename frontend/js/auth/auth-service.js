require('angular-cookie');

module.exports = angular.module('TodoApp.Auth.AuthService', [
    require('./registration').name,
    require('./session').name,
    'ivpusic.cookie'
])

.factory('AuthService', function(Registration, Session, $q, $state, ipCookie) {
    var module = {
        isAuthed: false,
        userEmail: null,

        onSignIn: [],
        onSignOut: [],

        register: function(email, password) {
            var context = this;

            var registration = Registration.create();
            var result = registration.register(email, password);

            result
                .success(function() {
                    context._signInSuccess(email);
                })
            ;

            return result;
        },

        signIn: function(email, password) {
            var context = this;

            var session = Session.create();
            var result = session.signIn(email, password);

            result
                .success(function(response) {
                    context._signInSuccess(response.data.userEmail);
                })
                .error(function() {
                    context._signInError();
                })
            ;
            
            return result;
        },

        _signInSuccess: function(email) {
            this.isAuthed = true;
            this.userEmail = email;

            this._createCookie();

            $state.go('authed');

            this._callEventHandlers(this.onSignIn);
        },

        _signInError: function() {
            this._resetAuth();

            this._callEventHandlers(this.onSignOut);
        } ,

        reload: function() {
            if (this.authedEmailFromCookie()) {
                $state.go('authenticating');

                this.signIn();
            }
        },
        
        signOut: function() {
            var session = Session.create();

            var result = session.signOut();

            this._resetAuth();

            this._callEventHandlers(this.onSignOut);

            return result;
        },

        authedEmailFromCookie: function() {
            return ipCookie('authedUserEmail');
        },

        _createCookie: function() {
            ipCookie('authedUserEmail', this.userEmail);
        },

        _resetAuth: function() {
            this.isAuthed = false;
            this.userEmail = null;
            this._createCookie();

            $state.go('anonymous');
        },

        _callEventHandlers: function(callbacks) {
            for(var i = 0; i < callbacks.length; ++i) {
                callbacks[i]();
            }
        }
    };

    module.reload(); // Try to re-authenticate using session upon initialization

    return module;
});
