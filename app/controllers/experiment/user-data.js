import Ember from 'ember';
import EmberValidations from 'ember-validations';

export default Ember.Controller.extend(EmberValidations, {
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
        alert("Got it!");
      });
    }
  }
});
