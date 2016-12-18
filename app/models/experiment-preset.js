import DS from 'ember-data';
import Ember from 'ember';

export default DS.Model.extend({
  name: DS.attr(),
  timeoutmode: DS.attr(),
  timeoutvalue: DS.attr(),
  feedbackmode: DS.attr(),
  repeatscount: DS.attr(),
  experiments: DS.hasMany('experiment'),
  timeoutmode_str: Ember.computed('timeoutmode', function () {
    return {
      'fixed': 'Fixed',
      'responsive': 'Responsive'
    }[this.get('timeoutmode')];
  }),
  feedbackmode_str: Ember.computed('feedbackmode', function () {
    return {
      'none': 'None',
      'n_audio': 'Audible beep on error'
    }[this.get('feedbackmode')];
  })
});
