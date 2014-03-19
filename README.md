# Installation steps
It is assumed that you have Ruby 2.1.1, Bundler, Rails 4 and PostgreSQL installed. Database settings may need
to be adjusted in config/database.yml.

1. Run ```bundle install```
2. Run ```rake db:create``` (if the database hasn't already been created)
3. Run ```rake db:migrate```
4. Enter the ```frontend``` directory and follow the steps to build the client application.
5. Run ```rails start```