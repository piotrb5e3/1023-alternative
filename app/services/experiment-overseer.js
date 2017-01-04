import Ember from 'ember';
import RSVP from 'rsvp';

const delayBetweenLightsets = 1000;

const TRAINING_SESSION_LENGTH = 100;

const INCORRECT_KEY_NUMBER = -1;

const buttonMapper = {
  'KeyQ': 1,
  'KeyW': 2,
  'KeyE': 3,
  'KeyR': 4,
  'KeyV': 5,
  'KeyB': 6,
  'KeyY': 7,
  'KeyU': 8,
  'KeyI': 9,
  'KeyO': 10
};

export default Ember.Service.extend({
  userid: null,
  userpass: null,
  controller: null,
  isModalOpen: false,
  modalHeader: 'Hai',
  modalText: "You aren't supposed to see this :frown:",
  modalBtnText: 'Next?',
  shouldRedirectToThankYou: false,
  shouldRedirectToPause: false,
  beeper: Ember.inject.service(),
  experimentGateway: Ember.inject.service(),
  isTrainingSession: false,
  trainingSessionCounter: 0,
  isLightoffInProgress: false,
  lightset: 0,
  lightsetMask: 0,
  isDisplayingLightset: Ember.computed('lightset', function () {
    "use strict";
    return this.get('lightset') !== 0;
  }),
  waitingLightoffObserver: Ember.observer('lightset', 'lightsetMask', function () {
    "use strict";
    Ember.run.once(() => {
      let lightoffMode = this.get('settings.lightoffmode');
      if (lightoffMode === 'waiting') {
        let lightset = this.get('lightset');
        let lightsetMask = this.get('lightsetMask');
        let lightoffTimeout = this.get('settings.lightofftimeout');
        let isLightoffInProgress = this.get('isLightoffInProgress');
        if (!isLightoffInProgress &&
          lightset !== 0 &&
          ((lightset & lightsetMask) === lightset)
        ) {
          this.set('isLightoffInProgress', true);
          Ember.run.later(() => {
            this.finishShowingCombination();
          }, lightoffTimeout);
        }
      }
    });
  }),
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
  handleKeyPress(keyCode) {
    "use strict";
    if (keyCode === 'Escape') {
      this.onPauseKeyPressed();
    } else {
      if (!this.get('isDisplayingLightset')) {
        console.info('Button pressed when no combination was shown');
        return;
      }
      if (keyCode in buttonMapper) {
        let number = buttonMapper[keyCode];
        this.onCorrectKeyPressed(number);
      } else {
        this.onIncorrectKeyPressed();
      }
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
          console.info('No lightset to be paused.');
        });
      });
  },
  getNextLightset() {
    "use strict";
    let isTrainingSession = this.get('isTrainingSession');
    let lightoffMode = this.get('settings.lightoffmode');
    let userid = this.get('userid');
    let userpass = this.get('userpass');
    this.set('lightset', 0);
    this.set('lightsetMask', 0);
    this.set('isLightoffInProgress', false);
    if (isTrainingSession) {
      this.set('lightset', 128);
      if (lightoffMode === 'fixed') {
        let lightoffTimeout = this.get('settings.lightofftimeout');
        Ember.run.later(() => this.finishShowingCombination(), lightoffTimeout);
      }
    } else {
      return this.get('experimentGateway').retrieveLightset(userid, userpass)
        .then((lightset) => {
          this.set('lightset', lightset);
          if (lightoffMode === 'fixed') {
            let lightoffTimeout = this.get('settings.lightofftimeout');
            Ember.run.later(() => this.finishShowingCombination(), lightoffTimeout);
          }
          return this.get('experimentGateway').reportBegin(userid, userpass);
        }).catch(this.reportError.bind(this));
    }
  },
  pauseCurrentLightset() {
    "use strict";
    let userid = this.get('userid');
    let userpass = this.get('userpass');
    if (this.get('isTrainingSession') || this.get('lightset') === 0 || !userid) {
      return new RSVP.Promise(function (resolve /*, reject */) {
        resolve();
      });
    } else {
      return this.get('experimentGateway').reportPause(userid, userpass);
    }
  },
  reportError(err) {
    "use strict";
    console.error(JSON.stringify(err));
  },
  reportLightsetShowingFinished() {
    "use strict";
    let userid = this.get('userid');
    let userpass = this.get('userpass');
    if (this.get('isTrainingSession')) {
      console.error('Reporting during training session!');
    }
    return this.get('experimentGateway').reportFinish(userid, userpass);
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
    this.set('shouldRedirectToThankYou', false);
    this.set('shouldRedirectToPause', false);
    this.set('isLightoffInProgress', false);
    this.set('isModalOpen', false);
  },
  isAuthenticated(){
    "use strict";
    return !!this.get('userid');
  },
  modalNext: () => {
    alert('What happened?');
  },
  trainingStartInfo() {
    "use strict";
    this.set('isModalOpen', true);
    this.set('modalHeader', 'Instructions');
    this.set('modalText', 'Instructions placeholder');
    this.set('modalBtnText', 'NEXT');
    this.set('modalNext', () => {
      this.set('modalHeader', 'Training session');
      this.set('modalText', 'When you close this alert, the training session will start.');
      this.set('modalBtnText', 'CLOSE');
      this.set('modalNext', () => {
        this.set('isModalOpen', false);
        this.beginTrainingSession();
      });
    });
  },
  trainingEndInfo() {
    "use strict";
    this.reportTrainingFinished();
    this.set('lightset', 0);
    this.set('isModalOpen', true);
    this.set('modalHeader', 'Experiment');
    this.set('modalText', 'The training session is now finished. ' +
      'Experiment session will start 10 seconds after you close this alert');
    this.set('modalBtnText', 'NEXT');
    this.set('modalNext', () => this.beginExperimentSession());
  },
  beginTrainingSession() {
    "use strict";
    this.set('isTrainingSession', true);
    this.set('trainingSessionCounter', TRAINING_SESSION_LENGTH);
    this.getNextLightset();
  },
  beginExperimentSession() {
    "use strict";
    this.set('isTrainingSession', false);
    this.set('modalHeader', 'Experiment');
    this.set('modalText', 'Get ready, the experiment will start in 10 seconds.');
    this.set('modalBtnText', '');
    this.set('modalNext', () => {
    });
    this.set('isModalOpen', true);
    Ember.run.later(() => {
      this.set('isModalOpen', false);
      this.getNextLightset();
    }, 10000);
  },
  enterExperiment() {
    "use strict";
    let settings = this.get('settings');
    if (settings.runTrainingSession) {
      this.trainingStartInfo();
    } else {
      this.beginExperimentSession();
    }
  },
  reportTrainingFinished() {
    "use strict";
    let userid = this.get('userid');
    let userpass = this.get('userpass');
    this.get('experimentGateway').reportTrainingFinished(userid, userpass)
      .catch(this.reportError.bind(this));
  },
  finishShowingCombination() {
    "use strict";
    this.set('lightset', 0);
    if (this.get('isTrainingSession')) {
      let count = this.get('trainingSessionCounter') - 1;
      this.set('trainingSessionCounter', count);
      if (count <= 0) {
        this.trainingEndInfo();
      } else {
        Ember.run.later(() => this.getNextLightset(), delayBetweenLightsets);
      }
    } else {
      this.reportLightsetShowingFinished()
        .then((resp) => {
          if (resp === 'OK') {
            Ember.run.later(() => this.getNextLightset(), delayBetweenLightsets);
          } else if (resp === 'FIN') {
            this.set('shouldRedirectToThankYou', true);
          } else {
            console.error('Unknown lightset finish response code: ' + resp);
          }
        })
        .catch(this.reportError.bind(this));
    }
  },
  onCorrectKeyPressed(keyNumber) {
    "use strict";
    let isTrainingSession = this.get('isTrainingSession');
    let lights = this.get('lights');
    let audioMode = this.get('settings.audiomode');
    let userid = this.get('userid');
    let userpass = this.get('userpass');

    let mask = this.get('lightsetMask');
    this.set('lightsetMask', mask | 1 << (keyNumber - 1));

    if (!isTrainingSession) {
      this.get('experimentGateway').reportPress(userid, userpass, keyNumber)
        .catch(this.reportError.bind(this));
    }

    if (audioMode === 'beep' && !(lights[keyNumber].on)) {
      this.get('beeper').playBeep();
    }
  },
  onIncorrectKeyPressed() {
    "use strict";
    let isTrainingSession = this.get('isTrainingSession');
    let audioMode = this.get('settings.audiomode');
    let userid = this.get('userid');
    let userpass = this.get('userpass');

    if (!isTrainingSession) {
      this.get('experimentGateway').reportPress(userid, userpass, INCORRECT_KEY_NUMBER)
        .catch(this.reportError.bind(this));
    }

    if (audioMode === 'beep') {
      this.get('beeper').playBeep();
    }
  },
  onPauseKeyPressed() {
    "use strict";
    this.pauseCurrentLightset().then(() => {
      this.set('shouldRedirectToPause', true);
    }).catch(this.reportError.bind(this));
  }
});
