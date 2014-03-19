module.exports = angular.module('TodoApp.Auth.Session', [
])

.factory('Session', function($http) {
    return {
        serviceUrl: '/api/sessions',
        create: function(serviceUrl) {
            return new Session($http, serviceUrl ? serviceUrl : this.serviceUrl);
        }
    }
});

function Session($http, serviceUrl) {
    this.$http = $http;
    this.serviceUrl = serviceUrl;
    this.options = {withCredentials: true}
}

Session.prototype.signIn = function(email, password) {
    if (!email || !password) {
        // Try to re-authenticate
        return this.$http.post(this.serviceUrl, {}, this.options)
    } else {
        return this.$http.post(this.serviceUrl, {user: {email: email, password: password}}, this.options)
    }
};

Session.prototype.signOut = function(email, password) {
    return this.$http.delete(this.serviceUrl, {}, this.options)
};
