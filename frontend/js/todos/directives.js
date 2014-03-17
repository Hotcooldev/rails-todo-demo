module.exports = angular.module('TodoApp.Todos.Directives', [
    require('./todo').name
])

.directive('showTodo', function() {
    return {
        restrict: 'E',
        scope: {
            todo: '=todo'
        },
        replace: true,
        templateUrl: 'todos/show-todo',
        controller: function($scope) {
            $scope.originalTodo = null;
            $scope.editedTodo = null;
            $scope.editorEnabled = false;

            $scope.canShowEditor = function(todo) {
                return $scope.editorEnabled
                    && $scope.originalTodo === todo;
            };

            $scope.edit = function(todo) {
                $scope.originalTodo = todo;
                $scope.editedTodo = angular.copy(todo);

                $scope.editorEnabled = true;
            };

            $scope.save = function(todo) {
                angular.copy(todo, $scope.originalTodo);

                $scope.editorEnabled = false;
            };

            $scope.cancel = function() {
                $scope.editorEnabled = false;
            };

            $scope.delete = function(todo) {
                todo.deleted = true;
            }
        }
    }
})

.directive('addTodo', function() {
    return {
        restrict: 'E',
        scope: {
            todos: '=todos'
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
                var lastTodoPriority = $scope.todos[$scope.todos.length - 1].priority;
                todo.priority = lastTodoPriority + 1;

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
        controller: function($scope) {
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
