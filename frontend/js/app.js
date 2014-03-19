window.jQuery = require('jquery');

require('jquery-ui');

require('angular');
require('angular-bootstrap');
require('angular-ui-sortable');

angular.module('TodoApp', [
    // External dependencies
    'ui.bootstrap',
    'ui.sortable', // angular-ui-sortable

    // App
    require('./config').name,
    require('./auth/ui-states').name,
    require('./auth/auth-form-controller').name,
    require('./auth/signed-in-controller').name,
    require('./todos/todos-controller').name,
    require('./todos/directives').name
]);
