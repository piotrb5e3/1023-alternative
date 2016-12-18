import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function () {
  this.route('manage', function () {
    this.route('preset', {path: '/preset'}, function () {
      this.route('new', {path: '/new'});
      this.route('show', {path: '/:preset_id'});
    });

    this.route('experiment', {path: '/experiment'}, function () {
      this.route('new', {path: '/new'});
      this.route('show', {path: '/:experiment_id'}, function () {
        this.route('session', {path: '/session'}, function () {
          this.route('show', {path: '/:session_id'}, function() {
            this.route('combination', {path: '/combination'}, function() {
              this.route('show', {path: '/:combination_id'});
            });
          });
        });
      });
    });
  });
});

export default Router;
