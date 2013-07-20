SpreeOgpos
==========

Spree OG POS - A Retail Point Of Sale frontend for Spree

Installation
------------

Get a working Spree store going first:

https://github.com/spree/spree

Then add spree_ogpos to your Gemfile:

```ruby
gem 'spree_ogpos', :git => 'https://github.com/mribbons/spree_ogpos'
```

Bundle your dependencies and run the installation generator:

```shell
bundle
bundle exec rails g spree_ogpos:install
```

Copyright (c) 2013 Mike Ribbons, released under the New BSD License
