import Ember from "ember";
import {module, test} from "qunit";

let originalWarn;

module("workflow config", {
  beforeEach() {
    originalWarn = Ember.Logger.warn;
  },
  afterEach() {
    Ember.ENV.RAISE_ON_DEPRECATION = false;
    window.deprecationWorkflow.deprecationLog = { messages: { } };
    Ember.Logger.warn = originalWarn;
  }
});

test('deprecation silenced with string matcher', (assert) => {
  Ember.ENV.RAISE_ON_DEPRECATION = true;
  Ember.deprecate('silence-me');
  assert.ok(true, 'Deprecation did not raise');
});

test('deprecation logs with string matcher', (assert) => {
  assert.expect(1);

  let message = 'log-me';
  Ember.Logger.warn = function(passedMessage) {
    assert.equal(passedMessage, 'DEPRECATION: ' + message, 'deprecation logs');
  };
  Ember.deprecate(message);
});

test('deprecation thrown with string matcher', (assert) => {
  assert.throws(function() {
    Ember.deprecate('throw-me');
  }, 'deprecation throws');
});
