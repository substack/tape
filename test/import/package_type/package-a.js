import tape from '../../../index.js';

tape.test('package-type-a', function (t) {
    t.pass('test ran');
    t.end();
    global.package_type_a = true;
});

