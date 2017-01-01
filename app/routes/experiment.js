import Ember from 'ember';

export default Ember.Route.extend({
  experimentOverseer: Ember.inject.service(),
  beforeModel (){
    "use strict";
    if (!this.get('experimentOverseer').isAuthenticated()) {
      this.transitionTo('index');
    } else if (this.get('experimentOverseer').shouldAskForData()) {
      this.transitionTo('experiment.user-data');
    } else {
      this.transitionTo('experiment');
    }
  }
});
