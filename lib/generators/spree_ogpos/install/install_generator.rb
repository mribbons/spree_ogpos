module SpreeOgpos
  module Generators
    class InstallGenerator < Rails::Generators::Base

      class_option :auto_run_migrations, :type => :boolean, :default => false

      def add_javascripts
        # MDR 20/07/2013 - TODO - Should be able to add assets to folder for our controller rather than application.js
        # MDR 20/07/2013 - TODO - Should be able to require_tree retail_pos, but it doesn't work - require_tree doesn't look in extension folder?
        # MDR 20/07/2013 - TODO - Loop through js and css assets in retail_pos folder so we dont have to append_file each one explicitly
        # append_file 'app/assets/javascripts/application.js', "//= require retail_pos/namespace\n"
        # append_file 'app/assets/javascripts/application.js', "//= require retail_pos/pos_front\n"
        # MDR 20/07/2013 - Don't require_tree . - this includes admin/all.js which causes js errors
        # inject_into_file 'app/assets/javascripts/application.js', '//= break_tree . ', :before => /\/\/\= require_tree ./, :verbose => true
      end

      def add_stylesheets
        # inject_into_file 'app/assets/stylesheets/application.css', " *= require retail_pos/pos_front\n", :before => /\*\//, :verbose => true
      end

      def add_migrations
        run 'bundle exec rake railties:install:migrations FROM=spree_ogpos'
      end

      def run_migrations
        # MDR 20/07/2013 - No migrations yet
        #run_migrations = options[:auto_run_migrations] || ['', 'y', 'Y'].include?(ask 'Would you like to run the migrations now? [Y/n]')
        #if run_migrations
        #  run 'bundle exec rake db:migrate'
        #else
        #  puts 'Skipping rake db:migrate, don\'t forget to run it!'
        #end
      end
    end
  end
end
