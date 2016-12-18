import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['pb-component'],
  _progress_percent: Ember.computed('progress', function () {
    "use strict";
    return Math.round(this.get('progress') * 100);
  })
});
