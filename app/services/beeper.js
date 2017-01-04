import Ember from 'ember';
import {Oscillator} from 'ember-audio';
import {MusicalIdentity} from 'ember-audio/mixins';

const OL = Oscillator.extend(MusicalIdentity);

export default Ember.Service.extend({
  audio: Ember.inject.service(),
  oscillator: Ember.computed('audio', function () {
    "use strict";
    const audioContext = this.get('audio.audioContext');

    return OL.create({
      audioContext,
      frequency: 880
    });
  }),
  playBeep () {
    "use strict";
    Ember.run.later(() => {
      this.get('oscillator').playFor(0.1);
    }, 200);
  },
});
