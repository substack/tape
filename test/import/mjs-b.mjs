import tape from '../../index.js';

tape.test('mjs-b', function (t) {
    t.ok(global.mjs_a, 'test ran after mjs-a');
    t.end();
    global.mjs_b = true;
});
