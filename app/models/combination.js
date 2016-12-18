import DS from 'ember-data';

export default DS.Model.extend({
  session: DS.belongsTo('experiment-session'),
  lightset: DS.attr('number'),
  events: DS.hasMany('event')
});
