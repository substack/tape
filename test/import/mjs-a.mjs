import tape from '../../index.js';

tape.test('mjs-a', function (t) {
    t.pass('test ran');
    t.end();
    global.mjs_a = true;
});

