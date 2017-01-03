import Ember from 'ember';

export default Ember.Controller.extend({
  sortedSessions: Ember.computed.sort('model.sessions', (A, B) => {
    "use strict";
    let dA = new Date(A.get('createdon'));
    let dB = new Date(B.get('createdon'));
    if (dA < dB) {
      return 1;
    } else {
      return -1;
    }
  })
});
