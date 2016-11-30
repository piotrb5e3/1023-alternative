import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr(),
  timeout_mode: DS.attr(),
  timeout_value: DS.attr(),
  feedback_mode: DS.attr(),
  repeats_count: DS.attr()
});
