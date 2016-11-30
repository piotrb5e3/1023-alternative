import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('manage', function() {
    this.route('presets');

    this.route('preset', { path: '/preset' }, function() {
      this.route('new', { path: '/new' });
      this.route('show', { path: '/:preset_id' });
    });
  });
});

export default Router;
