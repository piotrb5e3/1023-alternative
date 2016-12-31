import Ember from 'ember';
import EmberValidations from 'ember-validations';

export default Ember.Controller.extend(EmberValidations, {
  experimentOverseer: Ember.inject.service(),
  invisibleErrors: Ember.A([" "]),
  userid: null,
  userpass: null,
  errors: {
    userid: Ember.A(),
    userpass: Ember.A()
  },
  validations: {
    'userid': {
      presence: true,
      length: {
        minimum: 1,
        maximum: 255
      }
    },
    'userpass': {
      presence: true,
      length: {
        minimum: 1,
        maximum: 255
      }
    },
  },
  actions: {
    formSubmit: function () {
      this.validate().then(() => {
        this.get('experimentOverseer')
          .initExperiment(this, this.get('userid'), this.get('userpass'))
          .then(() => {
            "use strict";
            this.set('userid', null);
            this.set('userpass', null);
            if (this.get('experimentOverseer').shouldAskForData()) {
              this.transitionToRoute('experiment.user-data');
            } else {
              this.transitionToRoute('experiment');
            }
          })
          .catch((err) => {
            let e = err.errors[0].title;
            this.set('errors.userpass', Ember.A([e]));
          });
      });
    }
  }
});
