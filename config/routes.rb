Rails.application.routes.draw do
  get 'static/main'

  root 'static#main'

  namespace :api do
    resources :podcasts do
      collection do
        get 'search'
        get 'show'
      end
    end
  end
end
