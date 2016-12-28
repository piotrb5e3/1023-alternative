import Ember from 'ember';
import {Oscillator} from 'ember-audio';
import {MusicalIdentity} from 'ember-audio/mixins';

const Beeper = Oscillator.extend(MusicalIdentity);

export default Ember.Service.extend({
  audio: Ember.inject.service(),
  experimentGateway: Ember.inject.service(),
  oscillator: Ember.computed('audio', function () {
    "use strict";
    const audioContext = this.get('audio.audioContext');

    return Beeper.create({
      audioContext,
      identifier: 'C6'
    });
  }),
  lightset: 0,
  lights: Ember.computed('lightset', function () {
    "use strict";
    var l = this.get('lightset');
    var r = {};
    for (var i = 1; i <= 10; i++) {
      r[i] = {
        on: (l % 2 === 1)
      };
      l = Math.floor(l / 2);
    }
    return r;
  }),
  playBeep () {
    "use strict";
    let controller = this;
    Ember.run.later(function () {
      controller.get('oscillator').playFor(0.1);
    }, 200);
  },
  handleKeyPress(keyCode) {
    "use strict";
    this.playBeep();
  },

});
