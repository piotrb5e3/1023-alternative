import Ember from 'ember';
import {EKMixin, keyDown, getCode} from 'ember-keyboard';

export default Ember.Component.extend(EKMixin, {
  experimentOverseer: Ember.inject.service(),
  lights: Ember.computed.alias('experimentOverseer.lights'),
  isModalOpen: Ember.computed.alias('experimentOverseer.isModalOpen'),
  modalHeader: Ember.computed.alias('experimentOverseer.modalHeader'),
  modalText: Ember.computed.alias('experimentOverseer.modalText'),
  modalBtnText: Ember.computed.alias('experimentOverseer.modalBtnText'),
  handleKeyDown: Ember.on(keyDown(), function (event) {
    let code = getCode(event);
    this.get('experimentOverseer').handleKeyPress(code);
  }),
  onDidReceiveAttrs: Ember.on('didReceiveAttrs', function () {
    this.get('experimentOverseer').enterExperiment();
    this.set('keyboardActivated', true);
  }),
  onRemoveElement: Ember.on('willClearRender', function () {
    "use strict";
    this.get('experimentOverseer').cleanup();
    this.set('keyboardActivated', false);
  }),
  actions: {
    modalBtnPressed() {
      "use strict";
      this.get('experimentOverseer').modalNext();
    }
  }
});
