import tape from '../../../index.js';

tape.test('package-type-c', function (t) {
    t.ok(global.package_type_b, 'test ran after package-type-b');
    t.end();
});
