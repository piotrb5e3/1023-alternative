import DS from 'ember-data';
import RSVP from 'rsvp';
import Ember from 'ember';

let statusDict = {
  pending: 'pending',
  active: 'active',
  finished: 'finished',
  archived: 'archived'
};

export default DS.Model.extend({
  STATUS: statusDict,
  name: DS.attr('string'),
  settings: DS.belongsTo('experiment-preset'),
  createdon: DS.attr('date'),
  startedon: DS.attr('date'),
  finishedon: DS.attr('date'),
  status: DS.attr('string'),
  sessions: DS.hasMany('experiment-session'),
  status_str: Ember.computed('status', function() {
    "use strict";
    return {
      pending: 'Pending',
      active: 'Active',
      finished: 'Finished',
      archived: 'Archived'
    }[this.get('status')];
  }),
  progress: 0.0,
  progressObserver: Ember.observer('sessions', 'settings', function () {
    let experiment = this;
    return RSVP.hash({
      sessions: experiment.get('sessions'),
      settings: experiment.get('settings')
    }).then(function (hash) {
      if (hash.sessions && hash.settings) {
        let progress = hash.sessions.filterBy('status', 'F').length / hash.settings.get('repeatscount');
        experiment.set('progress', progress);
      }
    }).catch(function (err) {
      alert(err);
    });
  })
});
