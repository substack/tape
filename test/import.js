'use strict';

var tap = require('tap');
var spawn = require('child_process').spawn;
var concat = require('concat-stream');
var hasDynamicImport = require('has-dynamic-import');

tap.test('importing mjs files',  function (t) {
    hasDynamicImport().then(function (hasSupport) {
        if (hasSupport) {
            var tc = function (rows) {
                t.same(rows.toString('utf8'), [
                    'TAP version 13',
                    '# mjs-a',
                    'ok 1 test ran',
                    '# mjs-b',
                    'ok 2 test ran after mjs-a',
                    '# mjs-c',
                    'ok 3 test ran after mjs-b',
                    '# mjs-d',
                    'ok 4 test ran after mjs-c',
                    '# mjs-e',
                    'ok 5 test ran after mjs-d',
                    '# mjs-f',
                    'ok 6 test ran after mjs-e',
                    '# mjs-g',
                    'ok 7 test ran after mjs-f',
                    '# mjs-h',
                    'ok 8 test ran after mjs-g',
                    '',
                    '1..8',
                    '# tests 8',
                    '# pass  8',
                    '',
                    '# ok'
                ].join('\n') + '\n\n');
            };

            var ps = tape('import/*.mjs');
            ps.stdout.pipe(concat(tc));
            ps.stderr.pipe(process.stderr);
            ps.on('exit', function (code) {
                t.equal(code, 0);
                t.end();
            });
        } else {
            t.pass('does not support dynamic import');
            t.end();
        }
    });
});

tap.test('importing type: "module" files', function (t) {
    hasDynamicImport().then(function (hasSupport) {
        if (hasSupport) {
            var tc = function (rows) {
                t.same(rows.toString('utf8'), [
                    'TAP version 13',
                    '# package-type-a',
                    'ok 1 test ran',
                    '# package-type-b',
                    'ok 2 test ran after package-type-a',
                    '# package-type-c',
                    'ok 3 test ran after package-type-b',
                    '',
                    '1..3',
                    '# tests 3',
                    '# pass  3',
                    '',
                    '# ok'
                ].join('\n') + '\n\n');
            };

            var ps = tape('import/package_type/*.js');
            ps.stdout.pipe(concat(tc));
            ps.stderr.pipe(process.stderr);
            ps.on('exit', function (code) {
                t.equal(code, 0);
                t.end();
            });
        } else {
            t.pass('does not support dynamic import');
            t.end();
        }
    });
});

function tape(args) {
    var proc = require('child_process');
    var bin = __dirname + '/../bin/tape';

    return proc.spawn('node', [bin].concat(args.split(' ')), { cwd: __dirname });
}
