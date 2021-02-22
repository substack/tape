import tape from '../../index.js';

tape.test('mjs-c', function (t) {
    t.ok(global.mjs_b, 'test ran after mjs-b');
    t.end();
    global.mjs_c = true;
});
