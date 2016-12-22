import DS from 'ember-data';
import Ember from 'ember';

export default DS.Model.extend({
  name: DS.attr('string'),
  lightoffmode: DS.attr('string'),
  lightofftimeout: DS.attr('number'),
  audiomode: DS.attr('string'),
  repeatscount: DS.attr('number'),
  sessions: DS.hasMany('experiment-session'),
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
