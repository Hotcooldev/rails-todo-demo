module.exports = angular.module('TodoApp.Todos.TodosController', [
    require('./todo').name
])

.controller('TodosController', function($scope, Todo) {
    $scope.todos = [
        Todo.create('Test item 1'),
        Todo.create('Test item 2')
    ];

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
});
