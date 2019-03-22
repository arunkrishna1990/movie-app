# movie-app

## Dependencies
Install the following in a new environment:

* Git Tools: https://git-scm.com/downloads
* Node: https://nodejs.org/en/

Run this command to get the global dev dependencies:

> $ npm i -g @angular/cli

## Getting started
First you will need to clone the repo; then you can install the necessary NPM packages and run the app.

```bash
# Clone the repo and enter it
$ git clone https://github.com/arunkrishna1990/movie-app.git

# Go to movie-app folder
$ cd movie-app

# Install dependencies
$ npm i

### Run Demo 
```bash
$ npm start
```

### Run Tests
```bash
$ npm test
```

### Breif Overview
The app is developed with the help of Redux the ngRx module in angular. Each of the different entities have their own state store and decided to go with this architecture because of the reactive ability the state can provide. The store folder inside the core folder contains the Actions, Reducers and Effects for each entities. 

The components folder contains the different UI elements for each routes movies, people, tvShows, sidebar, search bar.

The design is done using SCSS preprocessor.
