import Ember from 'ember';
import EmberValidations from 'ember-validations';

export default Ember.Controller.extend(EmberValidations, {
  breadCrumb: 'New',
  invisibleErrors: Ember.A([" "]),
  name: "",
  lightoffmode: "",
  lightofftimeout: "",
  audiomode: "",
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
    'lightoffmode': {
      presence: {message: "This field is required"},
    },
    'lightofftimeout': {
      presence: {
        message: "This field is required"
      },
      numericality: {
        greaterThanOrEqualTo: 0,
        allowBlank: true
      }
    },
    'audiomode': {
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
    lightoffmode: Ember.A(),
    lightofftimeout: Ember.A(),
    audiomode: Ember.A(),
    repeatscount: Ember.A(),
  },
  lightoffOptions: Ember.A([
    {id: 'fixed', name: 'X ms after lamps ale lit up'},
    {id: 'waiting', name: 'X ms after all correct buttons are pressed'},
  ]),
  audioOptions: Ember.A([
    {id: 'none', name: 'None'},
    {id: 'beep', name: 'Audible beep after incorrect button is pressed'},
  ]),
  actions: {
    formSubmit: function () {
      let controller = this;
      this.validate().then(function () {
        let experiment = controller.get('store').createRecord('experiment',
          {
            name: controller.get('name'),
            lightoffmode: controller.get('lightoffmode'),
            lightofftimeout: controller.get('lightofftimeout'),
            audiomode: controller.get('audiomode'),
            repeatscount: controller.get('repeatscount')
          });
        experiment.save()
          .then(function () {
            controller.set('name', '');
            controller.set('lightoffmode', '');
            controller.set('lightofftimeout', null);
            controller.set('audiomode', '');
            controller.set('repeatscount', null);
            controller.transitionToRoute("manage.experiment.show", experiment);
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
