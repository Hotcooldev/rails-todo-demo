moment = require('moment');

module.exports = angular.module('TodoApp.Todos.DateFilter', [])

.filter('todoDateFilter', function() {
    return function(date) {
        if (!date) {
            return '';
        }

        date = moment(date);
        var today = moment();

        if (Math.abs(date.diff(today, 'days')) > 3) {
            return date.format('YYYY-MM-DD');
        } else if (Math.abs(date.diff(today, 'hours')) < 24) {
            if (date.day() > today.day()) {
                return 'in a day';
            } else if (date.day() < today.day()) {
                return 'a day ago';
            } else {
                return 'today';
            }
        } else {
            return date.fromNow();
        }
    };
});