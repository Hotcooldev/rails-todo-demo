class Api::RegistrationsController < Devise::RegistrationsController
  include JsonHelpers

  def create
    build_resource(sign_up_params)

    if resource.save
      yield resource if block_given?

      sign_up(resource_name, resource)
      respond_with_success
    else
      clean_up_passwords resource
      respond_with_bad_request 'Bad Input', resource.errors
    end
  end
end
