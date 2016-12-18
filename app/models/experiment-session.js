import DS from 'ember-data';

export default DS.Model.extend({
  experiment: DS.belongsTo('experiment'),
  status: DS.attr(),
  number: DS.attr(),
  progress: DS.attr(),
  combinations: DS.hasMany('combination'),
  startedon: DS.attr('date'),
  finishedon: DS.attr('date'),
  status_str: Ember.computed('status', function () {
    "use strict";
    return {
      F: 'Finished',
      P: 'In progress'
    }[this.get('status')];
  }),
});
