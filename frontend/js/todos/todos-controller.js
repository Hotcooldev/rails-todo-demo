module.exports = angular.module('TodoApp.Todos.TodosController', [
    require('./todo').name
])

.controller('TodosController', function($scope, $filter, Todo) {
    $scope.todos = [];

    $scope.$watch('todos', todoWatcher, true);

    $scope.priorityOrderingOptions = {};

    $scope.sortByDate = false;

    fetchAllTodos();

    $scope.createTodo = function(todo) {
        todo.save();
    };

    $scope.updateTodo = function(todo) {
        todo.save();
    };

    $scope.deleteTodo = function(todo) {
    };

    function fetchAllTodos() {
        Todo.all(function(todos) {
            $scope.todos = sortByPriority(todos);
        });
    }

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
