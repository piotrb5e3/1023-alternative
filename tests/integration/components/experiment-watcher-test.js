import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('experiment-watcher', 'Integration | Component | experiment watcher', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{experiment-watcher}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#experiment-watcher}}
      template block text
    {{/experiment-watcher}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
