Rails.application.routes.draw do
  root to: 'static#index'

  namespace :api do
    namespace :v1 do
      namespace :auth do
        get  :me
        post :login
        post :signup
        delete :logout
      end
    end
  end

  get '*page', to: 'static#index'
end
