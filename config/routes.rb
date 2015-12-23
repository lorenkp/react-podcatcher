Rails.application.routes.draw do
  # get 'static/main'

  root 'static#main'
  
  namespace :api do
    resources :search
    resources :podcasts do
      resources :episodes
    end
  end
end
