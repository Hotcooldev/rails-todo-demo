window.jQuery = require('jquery');

require('jquery-ui');

require('angular');
require('angular-ui-sortable');

angular.module('TodoApp', [
    // External dependencies
    'ui.sortable', // angular-ui-sortable

    // App
    require('./config').name,
    require('./auth/ui-states').name,
    require('./auth/auth-controller').name,
    require('./todos/todos-controller').name,
    require('./todos/directives').name
]);
