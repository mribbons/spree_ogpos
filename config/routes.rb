Spree::Core::Engine.routes.draw do
  # Add your extension routes here
  get "retail_pos" => "retail_pos#home"

  # This also doesn't work
  #resources :home do
  #  member do
  #    get :retail_pos
  #  end
  #end
end
