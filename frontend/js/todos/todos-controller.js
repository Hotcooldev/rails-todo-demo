module.exports = angular.module('TodoApp.Todos.TodosController', [
    require('./todo').name
])

.controller('TodosController', function($scope, $filter, Todo) {
    $scope.todos = sortByPriority([
        Todo.create(1, 'Test item 1', 1),
        Todo.create(2, 'Test item 2', 0),
        Todo.create(3, 'Test item 3', 2)
    ]);

    $scope.$watch('todos', todoWatcher, true);

    $scope.priorityOrderingOptions = {};

    $scope.sortByDate = false;

    function sortByPriority(todos) {
        return $filter('orderBy')(todos, 'priority');
    }

    function todoWatcher() {
        updatePriorities();
        disposeOfDeletedTodos();
    }

    function updatePriorities() {
        var previousTodo = null;
        for (var i = 0; i < $scope.todos.length; ++i, previousTodo = todo) {
            var todo = $scope.todos[i];

            if (!previousTodo) {
                continue;
            }

            if (todo.priority < previousTodo.priority) {
                var newPriority = todo.priority;
                todo.priority = previousTodo.priority;
                previousTodo.priority = newPriority;
            }
        }
    }

    function disposeOfDeletedTodos() {
        for (var i = 0; i < $scope.todos.length; ++i) {
            if ($scope.todos[i].deleted) {
                $scope.todos.splice(i, 1);
                --i;
            }
        }
    }
});
