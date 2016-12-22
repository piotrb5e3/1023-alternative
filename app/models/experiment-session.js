import DS from 'ember-data';
import Ember from 'ember';

export default DS.Model.extend({
  experiment: DS.belongsTo('experiment'),
  status: DS.attr('string'),
  userid: DS.attr('string'),
  username: DS.attr('string'),
  userage: DS.attr('number'),
  usersex: DS.attr('string'),
  userpass: DS.attr('string'),
  progress: DS.attr('number'),
  startedon: DS.attr('date'),
  finishedon: DS.attr('date'),
  status_str: Ember.computed('status', function () {
    return {
      F: 'Finished',
      P: 'In progress'
    }[this.get('status')];
  }),
});
