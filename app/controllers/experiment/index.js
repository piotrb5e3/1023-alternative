import Ember from 'ember';
import {EKMixin, keyDown, getCode} from 'ember-keyboard';

export default Ember.Controller.extend(EKMixin, {
  experimentOverseer: Ember.inject.service(),
  lights: Ember.computed.alias('experimentOverseer.lights'),

  handleKeyDown: Ember.on(keyDown(), function (event) {
    let code = getCode(event);
    if (code === 'Escape') {
      this.get('experimentOverseer').pauseCurrentLightset().then(() => {
        "use strict";
        this.redirectToPausePage().then(() => {
          this.get('experimentOverseer').cleanup();
        });
      });
    } else {
      this.get('experimentOverseer').handleKeyPress(code);
    }
  }),
  redirectToPausePage() {
    "use strict";
    this.get('controller').transitionToRoute('experiment.pause');
  },
  startExperiment: Ember.on('init', function () {
    this.get('experimentOverseer').getNextLightset().catch((err) => alert(JSON.stringify(err)));
  }),
  activateKeyboard: Ember.on('init', function () {
    this.set('keyboardActivated', true);
  })
});
