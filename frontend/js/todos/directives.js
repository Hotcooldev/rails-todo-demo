module.exports = angular.module('TodoApp.Todos.Directives', [
    require('./todo').name
])

.directive('addTodo', function() {
    return {
        restrict: 'A',
        scope: {
            todos: '=addTodo'
        },
        replace: true,
        templateUrl: 'todos/add-todo',
        controller: function($scope, Todo) {
            $scope.newTodo = Todo.create();

            $scope.editorEnabled = false;

            $scope.edit = function() {
                $scope.editorEnabled = true;
            };

            $scope.save = function(todo) {
                $scope.todos.push(todo);
                $scope.newTodo = Todo.create();

                $scope.editorEnabled = false;
            };

            $scope.cancel = function() {
                $scope.editorEnabled = false;
            }
        }
    }
})

.directive('todoEditor', function() {
    return {
        restrict: 'E',
        scope: {
            todo: '=todo',
            onSave: '=onSave',
            onCancel: '=onCancel'
        },
        replace: true,
        templateUrl: 'todos/todo-editor',
        controller: function($scope, Todo) {
            $scope.priorities = Todo.priorities;

            $scope.done = function() {
                if ($scope.todoEditorForm.$invalid) {
                    return;
                }

                $scope.onSave($scope.todo);
            };

            $scope.cancel = function() {
                $scope.onCancel($scope.todo);
            };
        }
    }
})

;
