import Ember from 'ember';
import RSVP from 'rsvp';

export default Ember.Route.extend({
  model() {
    "use strict";
    return RSVP.hash({
      experiment: this.get('store').findAll('experiment'),
      preset: this.get('store').findAll('experiment-preset')
    });
  }
});
