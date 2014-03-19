module.exports = angular.module('TodoApp.Todos.Directives', [
    require('./todo').name
])

.factory('CloseLastOpenTodoEditor', function() {
    var todoEditorScope = null;

    return function(scope) {
        if (todoEditorScope && todoEditorScope !== scope) {
            todoEditorScope.cancel();
        }

        todoEditorScope = scope;
    }
})

.directive('showTodo', function(CloseLastOpenTodoEditor) {
    return {
        restrict: 'E',
        scope: {
            todo: '=',
            onSave: '=?',
            onDelete: '=?'
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

                CloseLastOpenTodoEditor($scope);
            };

            $scope.save = function(todo) {
                angular.copy(todo, $scope.originalTodo);

                if ($scope.onSave) {
                    $scope.onSave(todo);
                }

                $scope.editorEnabled = false;
            };

            $scope.cancel = function() {
                $scope.editorEnabled = false;
            };

            $scope.delete = function(todo) {
                todo.deleted = true;

                if ($scope.onDelete) {
                    $scope.onDelete(todo);
                }
            }
        }
    }
})

.directive('addTodo', function(CloseLastOpenTodoEditor) {
    return {
        restrict: 'E',
        scope: {
            todos: '=',
            onSave: '=?'
        },
        replace: true,
        templateUrl: 'todos/add-todo',
        controller: function($scope, Todo) {
            $scope.newTodo = Todo.create();

            $scope.editorEnabled = false;

            $scope.edit = function() {
                $scope.editorEnabled = true;

                CloseLastOpenTodoEditor($scope);
            };

            $scope.save = function(todo) {
                if ($scope.todos.length) {
                    var lastTodoPriority = $scope.todos[$scope.todos.length - 1].priority;
                    todo.priority = lastTodoPriority + 1;
                } else {
                    todo.priority = 0;
                }

                $scope.todos.push(todo);

                if ($scope.onSave) {
                    $scope.onSave(todo);
                }

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
            todo: '=',
            onSave: '=',
            onCancel: '='
        },
        replace: true,
        templateUrl: 'todos/todo-editor',
        controller: function($scope) {
            $scope.canShowDatePicker = false;

            $scope.openDatePicker = function($event) {
                $event.preventDefault();
                $event.stopPropagation();

                $scope.canShowDatePicker = true;
            };

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
