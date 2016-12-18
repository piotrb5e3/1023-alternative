import Ember from 'ember';

export default Ember.Route.extend({
  model(params) {
    "use strict";
    return this.get('store').findRecord('experiment-preset', params.preset_id, {
      include: 'experiments'
    });
  }
});
