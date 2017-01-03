import Ember from 'ember';
import EmberValidations from 'ember-validations';

export default Ember.Controller.extend(EmberValidations, {
  newSessions: Ember.inject.service(),
  invisibleErrors: Ember.A([" "]),
  newSessionsCount: null,
  validations: {
    'newSessionsCount': {
      presence: true,
      numericality: {
        greaterThanOrEqualTo: 1,
        allowBlank: true
      }
    }
  },
  errors: {
    newSessionsCount: Ember.A()
  },
  sortedSessions: Ember.computed.sort('model.sessions', (A, B) => {
    "use strict";
    let dA = new Date(A.get('createdon'));
    let dB = new Date(B.get('createdon'));
    if (dA < dB) {
      return 1;
    } else {
      return -1;
    }
  }),
  actions: {
    newSessionsSubmit() {
      "use strict";
      let count = this.get('newSessionsCount');
      let experimentId = this.get('model.id');
      this.validate().then(() => {
        console.log('Validated!');
        return this.get('newSessions').createNewSessions(experimentId, count)
          .then(() => {
            console.log('Connected!');
            this.set('newSessionsCount', null);
            return this.get('content').reload();
          });
      }).catch((err) => console.log(JSON.stringify(err)));
    }
  }
});
