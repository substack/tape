import tape from '../../index.js';

tape.test('mjs-d', function (t) {
    t.ok(global.mjs_c, 'test ran after mjs-c');
    t.end();
    global.mjs_d = true;
});
