import tape from '../../index.js';

tape.test('mjs-g', function (t) {
    t.ok(global.mjs_f, 'test ran after mjs-f');
    t.end();
    global.mjs_g = true;
});
