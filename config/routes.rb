Spree::Core::Engine.routes.draw do
  # Add your extension routes here
  get "retail_pos" => "home#retail_pos"

  # This also doesn't work
  #resources :home do
  #  member do
  #    get :retail_pos
  #  end
  #end
end
