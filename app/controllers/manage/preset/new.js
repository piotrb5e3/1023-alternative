import Ember from 'ember';
import EmberValidations from 'ember-validations';

export default Ember.Controller.extend(EmberValidations, {
  breadCrumb: 'New',
  invisibleErrors: Ember.A([" "]),
  name: "",
  timeoutmode: "",
  timeoutvalue: "",
  feedbackmode: "",
  repeatscount: "",
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
    'timeoutmode': {
      presence: {message: "This field is required"},
    },
    'timeoutvalue': {
      presence: {
        message: "This field is required"
      },
      numericality: {
        greaterThanOrEqualTo: 0,
        allowBlank: true
      }
    },
    'feedbackmode': {
      presence: {message: "This field is required"},
    },
    'repeatscount': {
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
    timeoutmode: Ember.A(),
    timeoutvalue: Ember.A(),
    feedbackmode: Ember.A(),
    repeatscount: Ember.A(),
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
        let preset = controller.get('store').createRecord('experiment-preset',
          {
            name: controller.get('name'),
            timeoutmode: controller.get('timeoutmode'),
            timeoutvalue: controller.get('timeoutvalue'),
            feedbackmode: controller.get('feedbackmode'),
            repeatscount: controller.get('repeatscount'),
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
