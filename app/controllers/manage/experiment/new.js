import Ember from 'ember';
import EmberValidations from 'ember-validations';

export default Ember.Controller.extend(EmberValidations, {
  breadCrumb: 'New',
  invisibleErrors: Ember.A([" "]),
  name: "",
  settingsId: null,
  usedNamesObserver: Ember.observer('model', function () {
    "use strict";
    this.get('validations')['name'].exclusion.in = this.get('model.experiment').mapBy('name');
  }),
  settingsOptions: Ember.computed.alias('model.preset'),
  validations: {
    'name': {
      exclusion: {
        allowBlank: true,
        in: []
      },
      presence: true,
      length: {
        maximum: 255
      }
    },
    'settingsId': {
      presence: true,
    },
  },
  actions: {
    formSubmit: function () {
      let controller = this;
      this.validate().then(function success() {
        "use strict";
        return controller.get('store').find('experiment-preset', controller.get('settingsId'));
      }).then(function (settings) {
        let experiment = controller.get('store').createRecord('Experiment',
          {
            name: controller.get('name'),
            settings: settings,
            status: 'pending'
          });
        controller.set('experiment', experiment);
        return experiment.save();
      }).then(function (experiment) {
        controller.set('name', '');
        controller.set('settingsId', null);
        return controller.transitionToRoute("manage.experiment.show", experiment);
      }).catch(function (error) {
        controller.get('experiment').deleteRecord();
        alert(JSON.stringify(error));
      });
    }
  }
})
;
