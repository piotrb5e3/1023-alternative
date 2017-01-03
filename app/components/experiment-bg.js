import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['experiment-bg'],

  setHeight() {
    this.$().outerHeight(this.$(window).height());
  },

  didRender() {
    this._super();

    this.setHeight();

    const elementID = this.get('elementId');
    this.$(window).on(`resize.${elementID}`, () => this.setHeight());
  },

  willDestroyElement() {
    const elementID = this.get('elementId');
    this.$(window).off(`resize.${elementID}`);

    this._super();
  }
});
