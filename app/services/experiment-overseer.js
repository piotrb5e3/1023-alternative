import Ember from 'ember';
import {Oscillator} from 'ember-audio';
import {MusicalIdentity} from 'ember-audio/mixins';

const Beeper = Oscillator.extend(MusicalIdentity);

export default Ember.Service.extend({
  userid: null,
  userpass: null,
  controller: null,
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
    Ember.run.later(() => {
      this.get('oscillator').playFor(0.1);
    }, 200);
  },
  handleKeyPress(keyCode) {
    "use strict";
    switch (keyCode) {
      case 'KeyQ':
        this.goToNextLightset();
        break;
      default:
        this.playBeep();
        break;
    }
  },
  initExperiment(userid, userpass) {
    "use strict";
    return this.get('experimentGateway').retrieveSettings(userid, userpass)
      .then((settings) => {
        this.set('userid', userid);
        this.set('userpass', userpass);
        this.set('settings', settings);
        this.pauseCurrentLightset().catch(() => {
        });
      });
  },
  getNextLightset() {
    "use strict";
    let userid = this.get('userid');
    let userpass = this.get('userpass');
    return this.get('experimentGateway').retrieveLightset(userid, userpass).then(
      (lightset) => {
        this.set('lightset', lightset);
      }).then(
      () => this.get('experimentGateway').reportBegin(userid, userpass)
    ).catch((err) => this.reportError(err));
  },
  pauseCurrentLightset() {
    "use strict";
    let userid = this.get('userid');
    let userpass = this.get('userpass');
    return this.get('experimentGateway').reportPause(userid, userpass)
      .catch(this.reportError.bind(this));
  },
  reportError(err) {
    "use strict";
    console.log(JSON.stringify(err));
  },
  goToNextLightset() {
    "use strict";
    let userid = this.get('userid');
    let userpass = this.get('userpass');
    this.set('lightset', 0);
    return this.get('experimentGateway').reportFinish(userid, userpass)
      .then(() => Ember.run.later(this.getNextLightset(), 500))
      .catch(this.reportError.bind(this));
  },
  reportUserData(data) {
    "use strict";
    let userid = this.get('userid');
    let userpass = this.get('userpass');
    return this.get('experimentGateway').reportUserData(userid, userpass, data);
  },
  shouldAskForData() {
    "use strict";
    return this.get('settings.askUserData');
  },
  cleanup(){
    "use strict";
    this.set('settings', null);
    this.set('lightset', 0);
    this.set('userid', null);
    this.set('userpass', null);
  },
  isAuthenticated(){
    "use strict";
    return !!this.get('userid');
  }
});
