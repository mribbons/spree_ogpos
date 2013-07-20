class RetailPosController < ApplicationController
  require 'spree'

  def home
    @products = Spree::Product.all
    @user = Spree::User.all.detect{ |u| u.spree_api_key.length > 0 }
    Rails.logger.debug "@user: #{@user.inspect}"
    #render :layout => false
  end
end
