import DS from 'ember-data';
import Ember from 'ember';

export default DS.Model.extend({
  name: DS.attr('string'),
  lightoffmode: DS.attr('string'),
  lightofftimeout: DS.attr('number'),
  audiomode: DS.attr('string'),
  repeatscount: DS.attr('number'),
  sessions: DS.hasMany('experiment-session', {async: 'false'}),
  sessions_count: Ember.computed('sessions.[]', function () {
    return this.get('sessions').toArray().length;
  }),
  sessions_fin_count: Ember.computed('sessions.@each.status', function () {
    return this.get('sessions').filterBy('status', 'F').length;
  }),
  lightoffmode_str: Ember.computed('lightoffmode', function () {
    return {
      fixed: 'Fixed',
      waiting: 'Waiting'
    }[this.get('lightoffmode')];
  }),
  audiomode_str: Ember.computed('audiomode', function () {
    return {
      none: 'None',
      beep: 'Audible beep on error'
    }[this.get('audiomode')];
  })
});
