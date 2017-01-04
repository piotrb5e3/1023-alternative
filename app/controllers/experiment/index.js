import Ember from 'ember';

export default Ember.Controller.extend({
  experimentOverseer: Ember.inject.service(),
  shouldRedirectToPause: Ember.computed.alias('experimentOverseer.shouldRedirectToPause'),
  shouldRedirectToThankYou: Ember.computed.alias('experimentOverseer.shouldRedirectToThankYou'),
  thankYouRedirectObserver: Ember.observer('shouldRedirectToThankYou', function () {
    "use strict";
    if (this.get('shouldRedirectToThankYou')) {
      this.redirectToThankYouPage();
    }
  }),
  pauseRedirectObserver: Ember.observer('shouldRedirectToPause', function () {
    "use strict";
    if (this.get('shouldRedirectToPause')) {
      this.redirectToPausePage();
    }
  }),
  redirectToPausePage() {
    "use strict";
    return this.transitionToRoute('experiment.pause');
  },
  redirectToThankYouPage() {
    "use strict";
    return this.transitionToRoute('experiment.thank-you');
  },
  runOnInit: Ember.on('init', function () {
    "use strict";
    this.get('shouldRedirectToPause');
    this.get('shouldRedirectToThankYou');
  }),
});
