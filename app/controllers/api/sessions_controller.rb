class Api::SessionsController < Devise::SessionsController
  include JsonHelpers

  def create
    return unless try_to_authenticate

    respond_with_success 'Login Successful', {userEmail: self.resource.email}
  end

  def destroy
    return unless try_to_authenticate

    sign_out
    respond_with_success
  end

  def try_to_authenticate
    self.resource = warden.authenticate
    if self.resource
      true
    else
      respond_with_access_denied 'Invalid Credentials'
      false
    end
  end
end