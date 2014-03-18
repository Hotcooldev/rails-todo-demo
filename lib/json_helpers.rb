module JsonHelpers
  def respond_with_success(title = '', data = {})
    @response = Response.new

    @response.title = title
    @response.data = data

    render @response.to_hash
  end

  def respond_with_server_error(title = 'Internal Server Error', data = {})
    @response = Response.new

    @response.status_code = 500
    @response.status = :error

    @response.title = title
    @response.data = data

    render @response.to_hash
  end

  def respond_with_bad_request(title = 'Bad Request', data = {})
    @response = Response.new

    @response.status_code = 400
    @response.status = :error

    @response.title = title
    @response.data = data

    render @response.to_hash
  end

  def respond_with_access_denied(title = 'Unauthorized', data = {})
    @response = Response.new

    @response.status_code = 401
    @response.status = :error

    @response.title = title
    @response.data = data

    render @response.to_hash
  end

  class Response
    def initialize
      @status_code = 200
      @status = 'success'
      @response = {}
    end

    def status_code=(status_code)
      @status_code = status_code
    end

    def status=(status)
      @status = status.to_s
    end

    def title=(title)
      append_to_response(:title, title)
    end

    def data=(data)
      append_to_response(:data, data)
    end

    def append_to_response(key, value)
      @response[key] = value unless value.blank?
    end

    def to_hash
      {json: {status: @status}.merge(@response), status: @status_code}
    end
  end
end