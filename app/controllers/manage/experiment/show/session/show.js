import Ember from 'ember';

export default Ember.Controller.extend({
  breadCrumb: 'Session',
  breadCrumbModel: Ember.computed.alias('model'),
  breadCrumbPath: 'manage.experiment.show.session.show'
});
