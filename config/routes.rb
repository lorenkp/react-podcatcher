Rails.application.routes.draw do
  root 'static#main'

  namespace :api do
    resources :subscriptions
    resources :episode_statuses, only: [:update]
    resources :search
    resources :podcasts do
      resources :episodes
    end
  end
end
