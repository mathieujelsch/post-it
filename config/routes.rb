Rails.application.routes.draw do
  devise_for :users
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
  root to: "pages#home"
  # get "home", to: "pages#home"
  # resources :postits, only: [:create]
  resources :postits, only: [:index, :create, :destroy, :update]
end
