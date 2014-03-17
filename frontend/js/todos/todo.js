module.exports = angular.module('TodoApp.Todos.Todo', [])

.factory('Todo', function() {
    return {
        create: function(description) {
            return new Todo(description)
        },
        priorities: Todo.priorities
    }
});

function Todo(description, priority) {
    this.description = description ? description : '';
    this.priority = priority ? priority : 'normal';
    this.isComplete = false;
}

Todo.priorities = [
    'very high',
    'high',
    'normal',
    'low',
    'very low'
];
