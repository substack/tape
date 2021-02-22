import tape from '../../../index.js';

tape.test('package-type-b', function (t) {
    t.ok(global.package_type_a, 'test ran after package-type-a');
    t.end();
    global.package_type_b = true;
});
