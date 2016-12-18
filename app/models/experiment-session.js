import DS from 'ember-data';

export default DS.Model.extend({
  experiment: DS.belongsTo('experiment'),
  status: DS.attr(),
  number: DS.attr(),
  progress: DS.attr(),
  combinations: DS.hasMany('combination')
});
