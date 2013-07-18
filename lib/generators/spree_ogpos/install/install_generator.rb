module Spree
  HomeController.class_eval do
    def retail_pos
      render :layout => false
    end
  end
end