import Ember from 'ember';


let charMap = {
  1: 'Q',
  2: 'W',
  3: 'E',
  4: 'R',
  5: 'V',
  6: 'B',
  7: 'Y',
  8: 'U',
  9: 'I',
  10: 'O'
};

export default Ember.Component.extend({
  tagName: 'td',
  lightNo: 1,
  chr: Ember.computed('lightNo', function () {
    "use strict";
    let ln = this.get('lightNo');
    return charMap[ln];
  })
});
