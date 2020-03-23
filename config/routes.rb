Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      controller :auth do
        post :login
        post :signup
      end
    end
  end

  get '*page', to: 'static#index'
  root to: 'static#index'
end
