'use strict';

const test = require('ava');
const plugin = require('../lib');
const {readFileSync} = require('fs');
const path = require('path');
const posthtml = require('posthtml');
const fixtures = path.join(__dirname, 'fixtures');

test('options default to empty string', t => {
  return compare(t, 'default');
});

test('string options', t => {
  return compare(t, 'basic', {prefix: 'prefix_', suffix: '_suffix'});
});

test('function options', t => {
  return compare(t, 'basic', {
    prefix() {
      return 'prefix_';
    },
    suffix() {
      return '_suffix';
    }
  });
});

test('no src', t => {
  return compare(t, 'no-src');
});

async function compare(t, name, options) {
  const source = readFileSync(path.join(fixtures, `${name}.html`), 'utf8');
  const expected = readFileSync(path.join(fixtures, `${name}.expected.html`), 'utf8');
  const {html} = await posthtml([plugin(options)]).process(source);

  t.deepEqual(html, expected);
}
