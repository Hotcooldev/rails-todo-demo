module.exports = angular.module('TodoApp.Auth.Registration', [
])

.factory('Registration', function($http) {
    return {
        serviceUrl: '/api/registrations',
        create: function(serviceUrl) {
            return new Registration($http, serviceUrl ? serviceUrl : this.serviceUrl);
        }
    }
});

function Registration($http, serviceUrl) {
    this.$http = $http;
    this.serviceUrl = serviceUrl;
    this.options = {withCredentials: true}
}

Registration.prototype.register = function(email, password) {
    return this.$http.post(this.serviceUrl, {user: {email: email, password: password}}, this.options)
};
