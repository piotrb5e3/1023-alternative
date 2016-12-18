import Ember from 'ember';

export default Ember.Controller.extend({
  breadCrumb: Ember.computed('model', function () {
    return 'Session ' + this.get('model.number');
  }),
  breadCrumbModel: Ember.computed.alias('model'),
  breadCrumbPath: 'manage.experiment.show.session.show'
});
