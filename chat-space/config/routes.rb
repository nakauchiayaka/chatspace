Rails.application.routes.draw do
  devise_for :users
  root 'chats#index'
  resources :users, only: [:index, :edit, :update]
  resources :groups, only:[:new,:create,:edit,:update] do
    resources :chats, only:[:index,:create]
  end
end
