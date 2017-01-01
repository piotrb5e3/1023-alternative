import Ember from 'ember';
import {EKMixin, keyDown, getCode} from 'ember-keyboard';

export default Ember.Controller.extend(EKMixin, {
  experimentOverseer: Ember.inject.service(),
  lights: Ember.computed.alias('experimentOverseer.lights'),
  isModalOpen: Ember.computed.alias('experimentOverseer.isModalOpen'),
  modalHeader: Ember.computed.alias('experimentOverseer.modalHeader'),
  modalText: Ember.computed.alias('experimentOverseer.modalText'),
  modalBtnText: Ember.computed.alias('experimentOverseer.modalBtnText'),
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
    this.transitionToRoute('experiment.pause');
  },
  enterExperiment: Ember.on('init', function () {
    this.get('experimentOverseer').enterExperiment();
  }),
  activateKeyboard: Ember.on('init', function () {
    this.set('keyboardActivated', true);
  }),
  actions: {
    modalBtnPressed() {
      "use strict";
      this.get('experimentOverseer').modalNext();
    }
  }
});
