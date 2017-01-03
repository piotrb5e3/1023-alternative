import Ember from 'ember';

export default Ember.Service.extend({
  ajax: Ember.inject.service(),
  createNewSessions(experimentId, count) {
    "use strict";
    return this.get('ajax').request('extra/create-sessions', {
      method: 'GET',
      data: {
        count: count,
        experiment_id: experimentId
      }
    });
  }
});
