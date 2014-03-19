var moment = require('moment')

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
                todoData.due ? moment(todoData.due).toDate() : null,
                todoData.is_complete,
                todoData.client_token
            ));
        }

        callbackForResults(todos);
    });

    return result;
};

Todo.prototype._generateClientToken = function() {
    return this.clientToken = Date.now();
};

Todo.prototype.save = function() {
    if (this.id) {
        return this._update();
    } else {
        return this._create();
    }
};

Todo.prototype.delete = function() {
    var result = this.$http.delete(this.serviceUrl + '/' + this.id, {withCredentials: true});
    return result;
};

Todo.prototype._create = function() {
    var result = this.$http.post(this.serviceUrl, this._toRequestObject(), {withCredentials: true});

    var context = this;
    result.success(function(response) {
        context.id = response.data.id;
    });

    return result;
};

Todo.prototype._update = function() {
    var result = this.$http.put(this.serviceUrl + '/' + this.id, this._toRequestObject(), {withCredentials: true});
    return result;
};

Todo.prototype._translateDate = function() {
    if (!this.due) {
        return null;
    }

    var date = moment(this.due);
    if (date.isValid()) {
        return date.format('YYYY-MM-DD');
    } else {
        return null;
    }
};

Todo.prototype._toRequestObject = function() {
    return {todo: {
        client_token: this.clientToken,
        description: this.description,
        priority: this.priority,
        due: this._translateDate(),
        is_complete: this.isComplete
    }};
};
