import tape from '../../index.js';

tape.test('mjs-f', function (t) {
    t.ok(global.mjs_e, 'test ran after mjs-e');
    t.end();
    global.mjs_f = true;
});
