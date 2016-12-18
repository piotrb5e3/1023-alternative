import Ember from 'ember';

export default Ember.Route.extend({
  model(params) {
    "use strict";
    return this.get('store').findRecord('experiment', params.experiment_id, {
      include: 'sessions,sessions.combinations,sessions.combinations.events'
    });
  }
});
