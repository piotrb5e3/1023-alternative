import Ember from 'ember';
import EmberValidations from 'ember-validations';

export default Ember.Controller.extend(EmberValidations, {
  experimentOverseer: Ember.inject.service(),
  invisibleErrors: Ember.A([" "]),
  usersexOptions: Ember.A([
    {id: 'F', name: 'Female'},
    {id: 'M', name: 'Male'},
  ]),
  errors: {
    username: Ember.A(),
    userage: Ember.A(),
    usersex: Ember.A()
  },
  validations: {
    'username': {
      presence: true,
      length: {
        minimum: 1,
        maximum: 255
      }
    },
    'userage': {
      presence: true,
      numericality: {
        greaterThanOrEqualTo: 1,
        allowBlank: true
      }
    },
    'usersex': {
      presence: {
        message: "Select one"
      }
    }
  },
  actions: {
    formSubmit: function () {
      this.validate().then(() => {
        this.get('experimentOverseer').reportUserData({
          username: this.get('username'),
          usersex: this.get('usersex'),
          userage: this.get('userage')
        }).then(() => {
          "use strict";
          this.set('username', null);
          this.set('usersex', null);
          this.set('userage', null);
          this.transitionToRoute('experiment');
        }).catch((err) => alert(JSON.stringify(err)));
      });
    }
  }
});
