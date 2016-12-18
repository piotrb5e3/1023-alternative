import Ember from 'ember';

export default Ember.Controller.extend({
  breadCrumb: Ember.computed.alias('model.name'),
  breadCrumbModel: Ember.computed.alias('model'),
  breadCrumbPath: 'manage.experiment.show'
});
