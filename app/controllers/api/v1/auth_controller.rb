class Api::V1::AuthController < Api::ApiController
  # GET /api/v1/auth/me
  #
  def me
    render json: current_user&.to_h
  end

  # POST /api/v1/auth/login
  #
  def login
    user = User.find_by_email(params[:email])

    if user && user.authenticate(params[:password])
      session[:user_id] = user.id

      render json: user.to_h
    else
      render json: { error: "Invalid credentials" }, status: 401
    end
  end

  # POST /api/v1/auth/signup
  #
  def signup
    user = User.new(user_params)

    if user.save
      session[:user_id] = user.id

      render json: user.to_h
    else
      render json: { error: user.errors.first.to_s }
    end
  end

  # DELETE /api/v1/auth/logout
  #
  def logout
    session[:user_id] = nil

    render json: {}
  end

  private

  def user_params
    params.require(:user).permit(:name, :email, :password, :password_confirmation)
  end
end
