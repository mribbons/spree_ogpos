class RetailPosController < ApplicationController
  require 'spree'

  def home
    @products = Spree::Product.all
    #render :layout => false
  end
end
