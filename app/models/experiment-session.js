import DS from 'ember-data';

export default DS.Model.extend({
  experiment: DS.belongsTo('experiment'),
  status: DS.attr(),
  combinations: DS.hasMany('combination')
});
