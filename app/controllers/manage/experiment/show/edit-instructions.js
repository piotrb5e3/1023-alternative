import Ember from 'ember';

export default Ember.Controller.extend({
  breadCrumb: 'Edit instructions',
  instructions: Ember.computed.oneWay('model.instructions'),
  actions: {
    formSubmit: function () {
      let model = this.get('model');
      model.set('instructions', this.get('instructions'));
      model.save()
        .then(() => {
          this.set('instructions', '');
          this.transitionToRoute("manage.experiment.show", model);
        })
        .catch((error) => {
          model.rollbackAttributes();
          alert(JSON.stringify(error));
        });
    }
  }
});
