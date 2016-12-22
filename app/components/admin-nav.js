import Ember from 'ember';

export default Ember.Component.extend({
  links: Ember.A([
    {
      name: 'Experiments',
      link: 'manage.experiment'
    }
  ])
});
