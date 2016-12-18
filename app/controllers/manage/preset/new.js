import Ember from 'ember';
import EmberValidations from 'ember-validations';

export default Ember.Controller.extend(EmberValidations, {
  breadCrumb: 'New',
  invisibleErrors: Ember.A([" "]),
  name: "",
  timeout_mode: "",
  timeout_value: "",
  feedback_mode: "",
  repeats_count: "",
  usedNamesObserver: Ember.observer('model', function () {
    "use strict";
    this.get('validations')['name'].exclusion.in = this.get('model').mapBy('name');
  }),
  validations: {
    'name': {
      exclusion: {
        allowBlank: true,
        in: []
      },
      presence: {
        message: "This field is required"
      },
      length: {
        maximum: 255
      }
    },
    'timeout_mode': {
      presence: {message: "This field is required"},
    },
    'timeout_value': {
      presence: {
        message: "This field is required"
      },
      numericality: {
        greaterThanOrEqualTo: 0,
        allowBlank: true
      }
    },
    'feedback_mode': {
      presence: {message: "This field is required"},
    },
    'repeats_count': {
      presence: {
        message: ""
      },
      numericality: {
        greaterThanOrEqualTo: 0,
        allowBlank: true
      }
    }
  },
  errors: {
    name: Ember.A(),
    timeout_mode: Ember.A(),
    timeout_value: Ember.A(),
    feedback_mode: Ember.A(),
    repeats_count: Ember.A(),
  },
  timeoutOptions: Ember.A([
    {id: 'fixed', name: 'X ms after lamps ale lit up'},
    {id: 'responsive', name: 'X ms after all correct buttons are pressed'},
  ]),
  feedbackOptions: Ember.A([
    {id: 'none', name: 'None'},
    {id: 'n_audio', name: 'Audible beep after incorrect button is pressed'},
  ]),
  actions: {
    formSubmit: function () {
      let controller = this;
      this.validate().then(function () {
        "use strict";
        let preset = controller.get('store').createRecord('experiment-preset.js',
          {
            name: controller.get('name'),
            timeout_mode: controller.get('timeout_mode'),
            timeout_value: controller.get('timeout_value'),
            feedback_mode: controller.get('feedback_mode'),
            repeats_count: controller.get('repeats_count'),
          });
        preset.save()
          .then(function () {
            controller.transitionToRoute("manage.preset.show", preset);
          })
          .catch(function (error) {
            alert(JSON.stringify(error));
          });
      }).catch(function (err) {
        alert(JSON.stringify(err));
      });
    }
  }
})
;
