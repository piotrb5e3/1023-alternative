import Ember from 'ember';

export default Ember.Controller.extend({
  breadCrumb: Ember.computed('model.userid', function () {
    "use strict";
    let uid = this.get('model.userid');
    return 'Session for [' + uid + ']';
  }),
  breadCrumbModel: Ember.computed.alias('model'),
  breadCrumbPath: 'manage.experiment.show.session'
});
