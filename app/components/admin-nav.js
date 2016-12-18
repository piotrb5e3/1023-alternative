import Ember from 'ember';

export default Ember.Component.extend({
  links: Ember.A([
    {
      name: 'Presets',
      link: 'manage.preset'
    },
    {
      name: 'Experiments',
      link: 'manage.experiment'
    }
  ])
});
