SpreeOgpos
==========

This was an attempt at making a spree extension, however

```rake routes | grep retail_pos
```
produces no output

Installation
------------

Add spree_ogpos to your Gemfile:

```ruby
gem 'spree_ogpos', :git => 'https://github.com/mribbons/spree-extension-issue.git'
```

Bundle your dependencies and run the installation generator:

```shell
bundle
bundle exec rails g spree_ogpos:install
```

Copyright (c) 2013 [Mike Ribbons], released under the New BSD License
