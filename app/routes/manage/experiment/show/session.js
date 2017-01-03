import Ember from 'ember';

export default Ember.Route.extend({
  model(params) {
    return this.get('store').findRecord('experiment-session', params.session_id, {
      include: 'experiment'
    });
  }
});
