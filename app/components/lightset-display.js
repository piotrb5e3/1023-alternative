import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'span',
  cells: Ember.computed('lightset', function () {
    "use strict";
    let lightset = this.get('lightset');
    var p = 1;
    var result = [];
    for (var i = 0; i < 10; i++) {
      result[i] = !!(lightset & p);
      p *= 2;
    }
    return result;
  })
});
