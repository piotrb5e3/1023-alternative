import Ember from 'ember';
import {EKMixin, keyDown, getCode, EKOnFocusMixin} from 'ember-keyboard';

export default Ember.Component.extend(EKMixin, EKOnFocusMixin, {
  experimentOverseer: Ember.inject.service(),
  lights: Ember.computed.alias('experimentOverseer.lights'),

  handleKeyDown: Ember.on(keyDown(), function (event) {
    this.get('experimentOverseer').handleKeyPress(getCode(event));
  }),
  setupExperiment: Ember.on('init', function () {
    this.get('experimentOverseer').set('lightset', 12);
  })
});
