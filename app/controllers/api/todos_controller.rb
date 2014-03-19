class Api::TodosController < ApplicationController
  include UserAuth

  before_action :set_todo, only: [:show, :edit, :update, :destroy]

  # GET /todos
  def index
    respond_with_success 'Success', Todo.find_all_for_user(current_user)
  end

  # GET /todos/1
  def show
    respond_with_success 'Found', @todo
  end

  # POST /todos
  def create
    @todo = Todo.new(todo_params)

    @todo.user = current_user

    if @todo.save
      respond_with_success 'Created new todo', @todo
    else
      render json: @todo.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /todos/1
  def update
    if @todo.update(todo_params)
      respond_with_success 'Todo was updated'
    else
      render json: @todo.errors, status: :unprocessable_entity
    end
  end

  # DELETE /todos/1
  def destroy
    @todo.destroy
    respond_with_success 'Todo was deleted'
  end

  private
  def set_todo
    @todo = Todo.find_for_user(current_user, params[:id])
  rescue
    respond_with_bad_request 'Unable to find todo'
  end

  def todo_params
    params.require(:todo).permit(:client_token, :description, :priority, :due, :is_complete)
  end
end