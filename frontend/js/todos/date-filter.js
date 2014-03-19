moment = require('moment');

module.exports = angular.module('TodoApp.Todos.DateFilter', [])

.filter('todoDateFilter', function() {
    return function(due) {
        if (!due) {
            return 'sometime';
        }

        var today = moment().startOf('day');
        due = moment(due).startOf('day').zone(today.zone());

        if (!due.isValid() || !today.isValid()) {
            return 'sometime';
        }

        var daysDifference = Math.abs(due.diff(today, 'days'));
        if (daysDifference > 3) {
            return due.format('YYYY-MM-DD');
        } else if (daysDifference <= 1) {
            if (due.day() > today.day()) {
                return 'in a day';
            } else if (due.day() < today.day()) {
                return 'a day ago';
            } else {
                return 'today';
            }
        } else {
            if (due.day() > today.day()) {
                return 'in ' + daysDifference + ' days';
            } else {
                return daysDifference + ' days ago';
            }
        }
    };
});