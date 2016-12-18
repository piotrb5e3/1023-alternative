import DS from 'ember-data';

export default DS.Model.extend({
  combination: DS.belongsTo('combination'),
  eventtype: DS.attr('string'),
  time: DS.attr('date')
});
