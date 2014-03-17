module.exports = angular.module('TodoApp.Auth.AuthService', [])

.factory('AuthService', function() {
    coolEmail = 'foo';
    coolPassword = 'bar';

    return {
        auth: function(email, password, callback) {
            if (email === coolEmail && password === coolPassword) {
                this.isAuthed = true;
            }

            callback();
        },
        isAuthed: false
    };
});
