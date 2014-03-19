module UserAuth
  extend ActiveSupport::Concern

  attr_accessor :current_user

  included do
    before_action :require_user_authentication
  end

  def require_user_authentication
    self.current_user = warden.authenticate
    respond_with_access_denied unless current_user
  end
end