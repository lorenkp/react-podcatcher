Rails.application.routes.draw do
  get 'static/main'

  root 'static#main'

  # namespace :api do
  #   resources :search do
  #     collection do
  #       get 'search'
  #       get 'show'
  #     end
  #   end
  # end
  namespace :api do
    resources :search
  end
end
