require('angular');

angular.module('TodoApp', [
    require('./config').name,
    require('./auth/ui-states').name,
    require('./auth/auth-controller').name,
    require('./todos/todos-controller').name,
    require('./todos/directives').name
]);
