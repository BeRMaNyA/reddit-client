# REDDIT TOP POSTS

A reddit client built with React & Ruby on Rails

## Table of Contents

* [reddit-client](#reddit-client)
    * [Table of Contents](#table-of-contents)
    * [Dependencies](#dependencies)
    * [Running the app](#running-the-app)
    * [TODO](#todo)

## Dependencies

### Services

You need to install

- [Ruby](https://www.ruby-lang.org/)
- [Bundler](https://bundler.io/)
- [NodeJS](https://nodejs.com/)
- [Yarn](https://yarnpkg.com)
- [Postgresql](https://postgresql.org/)

### Gems

```bash
$ bundle install
```

### Node Libraries

```bash
$ yarn install
```

## Running the app

If you are running the app for the first time then:

```bash
$ cp config/database{.yml.sample,.yml}
$ vi config/database.yml # edit credentials
$ rake db:create:all
$ rake db:migrate
```

And lastly:

```bash
bin/webpack-dev-server &
rails s -b 0.0.0.0
```

### TODO

- [x] Sign Up
- [x] Sign In
- [x] Logout
- [x] List TOP POSTs
- [x] Open Image Full Size
- [x] Save pictures
- [x] Remove pictures 
- [x] Implement Gallery
- [x] Dismiss Post
- [X] Scroll Pagination
- [ ] Open Post
- [ ] Indicator of unread/read post
- [ ] Dismiss All
- [ ] Support split layout
