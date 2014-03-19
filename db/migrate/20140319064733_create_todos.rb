class CreateTodos < ActiveRecord::Migration
  def change
    create_table :todos do |t|
      t.integer :user_id, unsigned: true, null: false

      t.string :client_token, limit: 32, null: false

      t.string :description, null: false
      t.integer :priority, null: false
      t.date :due, null: true
      t.boolean :is_complete, null: false, default: false

      t.timestamps

      t.index :user_id
      t.index [:user_id, :client_token], unique: true
      t.index [:user_id, :priority], unique: true
    end
  end
end
