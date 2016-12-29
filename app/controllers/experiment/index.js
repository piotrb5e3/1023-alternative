import Ember from 'ember';
import {EKMixin, keyDown, getCode} from 'ember-keyboard';

export default Ember.Controller.extend(EKMixin, {
  experimentOverseer: Ember.inject.service(),
  lights: Ember.computed.alias('experimentOverseer.lights'),

  handleKeyDown: Ember.on(keyDown(), function (event) {
    this.get('experimentOverseer').handleKeyPress(getCode(event));
  }),
  setupExperiment: Ember.on('init', function () {
    this.get('experimentOverseer').initExperiment(this, '3cibdy7q', 'hghghgh').catch(function (err) {
      "use strict";
      alert(JSON.stringify(err));
    });
  }),
  activateKeyboard: Ember.on('init', function () {
    this.set('keyboardActivated', true);
  })
});
