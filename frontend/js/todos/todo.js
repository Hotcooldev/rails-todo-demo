module.exports = angular.module('TodoApp.Todos.Todo', [])

.factory('Todo', function($http) {
    Todo.$http = $http;

    return {
        create: function(id, description, priority, due, isComplete) {
            return new Todo(id, description, priority, due, isComplete)
        },

        all: Todo.all,

        todoConstructor: Todo
    }
});

function Todo(id, description, priority, due, isComplete, clientToken) {
    this.$http = Todo.$http;
    this.serviceUrl = Todo.serviceUrl;

    this.id = id;
    this.clientToken = clientToken ? clientToken : this._generateClientToken();
    this.description = description ? description : '';
    this.priority = priority ? priority : 0;
    this.due = due;
    this.isComplete = isComplete;
    this.deleted = false;
}

Todo.$http = null;
Todo.serviceUrl = '/api/todos';

Todo.all = function(callbackForResults) {
    var result = Todo.$http.get(Todo.serviceUrl, {}, {withCredentials: true});

    result.success(function(response) {
        if (
            !response.data
            || !response.data.length
        ) {
            callbackForResults([]);
        }

        var todos = [];
        for (var i = 0; i < response.data.length; ++i) {
            var todoData = response.data[i];

            todos.push(new Todo(
                todoData.id,
                todoData.description,
                todoData.priority,
                todoData.due,
                todoData.is_complete,
                todoData.client_token
            ));
        }

        callbackForResults(todos);
    });

    return result;
};

Todo.prototype._generateClientToken = function() {
    this.clientToken = Date.now();
};

Todo.prototype.save = function() {
};
