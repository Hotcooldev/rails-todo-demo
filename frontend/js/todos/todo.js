module.exports = angular.module('TodoApp.Todos.Todo', [])

.factory('Todo', function() {
    return {
        create: function(id, description, priority) {
            return new Todo(id, description, priority)
        }
    }
});

function Todo(id, description, priority, due) {
    this.id = id;
    this.description = description ? description : '';
    this.priority = priority ? priority : 0;
    this.due = due;
    this.isComplete = false;
    this.deleted = false;
}
