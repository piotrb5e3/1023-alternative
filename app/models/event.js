import DS from 'ember-data';

let EVENTTYPE_STR = {
  st: 'Started displaying combination',
  fn: 'Finished displaying combination'
};

for (var i = 1; i <= 10; i++) {
  EVENTTYPE_STR['bp' + i] = 'Button ' + i + ' pressed';
}

export default DS.Model.extend({
  combination: DS.belongsTo('combination'),
  eventtype: DS.attr('string'),
  time: DS.attr('date'),
  eventtype_str: Ember.computed('eventtype', function () {
    "use strict";
    return EVENTTYPE_STR[this.get('eventtype')];
  })
});
