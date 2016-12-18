import Ember from 'ember';

export default Ember.Controller.extend({
  breadCrumb: Ember.computed.alias('model.lightset'),
  breadCrumbModel: Ember.computed.alias('model'),
  breadCrumbPath: 'manage.experiment.show.session.show.combination.show'
});
