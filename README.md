# 1023 alternatives

Conduct Robert Seibel's 1023-alternative experiment.
Requires a [backend app](https://github.com/piotrb5e3/1023alternative-backend).

## Warning
At best it's a PoC. Not suitable for deployment, not secured properly, not tested.
If you are in need of an app like this one, contact me at piotrb5e3@gmail.com

## Prerequisites

You will need the following things properly installed on your computer.

* [Git](http://git-scm.com/)
* [Node.js](http://nodejs.org/) (with NPM)
* [Bower](http://bower.io/)
* [Ember CLI](http://ember-cli.com/)
* [PhantomJS](http://phantomjs.org/)

## Installation

* `git clone git@github.com:piotrb5e3/1023alternative.git` this repository
* `cd frontend`
* `npm install`
* `bower install`

## Running / Development

* `ember serve`
* Visit your app at [http://localhost:4200](http://localhost:4200).

### Running Tests

* `ember test`
* `ember test --server`

### Building

* `ember build` (development)
* `ember build --environment production` (production)

## Demo usage

* Visit [http://localhost:4200](http://localhost:4200) for participant login page
* Visit [http://localhost:4200/manage](http://localhost:4200/manage) for experimenter's panel
1. Create an experiment
2. Create sessions
3. Download list of credentials
4. Enter credentials on the login page
5. Complete an experiment session
6. Go to the experimenter's panel
7. Navigate to the experiment's sessions list
8. Download session data as CSV
  
