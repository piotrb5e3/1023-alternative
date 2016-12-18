import Ember from 'ember';

export default Ember.Route.extend({
  model(params) {
    "use strict";
    return this.get('store').findRecord('combination', params.combination_id, {
      include: 'events'
    });
  }
});
