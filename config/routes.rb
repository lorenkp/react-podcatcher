Rails.application.routes.draw do
  namespace :api do
    resources :podcasts do
      collection do
        get 'search'
        get 'show'
      end
    end
  end
end
