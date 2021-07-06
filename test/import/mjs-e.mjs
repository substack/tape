import tape from '../../index.js';

tape.test('mjs-e', function (t) {
    t.ok(global.mjs_d, 'test ran after mjs-d');
    t.end();
    global.mjs_e = true;
});
