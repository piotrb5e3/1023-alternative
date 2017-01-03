import Ember from 'ember';

export function ndWrap([value, ...rest]) {
  return value || 'ND';
}

export default Ember.Helper.helper(ndWrap);
