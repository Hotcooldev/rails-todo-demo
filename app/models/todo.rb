class Todo < ActiveRecord::Base
  belongs_to :user

  validates :user_id, presence: true, numericality: true

  validates :client_token, presence: true,
            uniqueness: {scope: :user_id, message: 'A record already exists with that client token'}

  validates :description, presence: true

  validates :priority, presence: true, numericality: true,
            uniqueness: {scope: :user_id, message: 'A record already exists with that priority'}

  scope :for_user, ->(user) { where(user: user) }

  def self.find_for_user(user, id)
    for_user(user).where(id: id)
  end

  def self.find_all_for_user(user)
    for_user(user)
  end
end
