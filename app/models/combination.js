import DS from 'ember-data';

export default DS.Model.extend({
  session: DS.belongsTo('experiment-session'),
  lightset: DS.attr('number'),
  events: DS.hasMany('event'),
  status: DS.attr('string'),
  user: DS.attr('string'),
  status_str: Ember.computed('status', function () {
    "use strict";
    return {
      F: 'Finished',
      P: 'In progress'
    }[this.get('status')];
  })
});
