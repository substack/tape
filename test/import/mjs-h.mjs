import tape from '../../index.js';

tape.test('mjs-h', function (t) {
    t.ok(global.mjs_g, 'test ran after mjs-g');
    t.end();
});
