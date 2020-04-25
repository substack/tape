'use strict';

var tap = require('tap');

var stripFullStack = require('./common').stripFullStack;
var runProgram = require('./common').runProgram;

var nodeVersion = process.versions.node;
var majorVersion = nodeVersion.split('.')[0];

if (Number(majorVersion) < 8) {
    process.exit(0);
}

tap.test('async1', function (t) {
    runProgram('async-await', 'async1.js', function (r) {
        t.same(r.stdout.toString('utf8'), [
            'TAP version 13',
            '# async1',
            'ok 1 before await',
            'ok 2 after await',
            '',
            '1..2',
            '# tests 2',
            '# pass  2',
            '',
            '# ok'
        ].join('\n') + '\n\n');
        t.same(r.exitCode, 0);
        t.same(r.stderr.toString('utf8'), '');
        t.end();
    });
});

tap.test('async4', function (t) {
    runProgram('async-await', 'async4.js', function (r) {
        t.same(stripFullStack(r.stdout.toString('utf8')), [
            'TAP version 13',
            '# async4',
            'ok 1 before await',
            'not ok 2 Error: oops',
            '  ---',
            '    operator: fail',
            '    stack: |-',
            '      Error: Error: oops',
            '          [... stack stripped ...]',
            '  ...',
            '',
            '1..2',
            '# tests 2',
            '# pass  1',
            '# fail  1',
        ].join('\n') + '\n\n');
        t.same(r.exitCode, 1);
        t.same(r.stderr.toString('utf8'), '');
        t.end();
    });
});

tap.test('async5', function (t) {
    runProgram('async-await', 'async5.js', function (r) {
        t.same(stripFullStack(r.stdout.toString('utf8')), [
            'TAP version 13',
            '# async5',
            'ok 1 before server',
            'ok 2 after server',
            'ok 3 before request',
            'ok 4 after request',
            'ok 5 res.statusCode is 200',
            'ok 6 mockDb.state is new',
            'ok 7 error on close',
            '',
            '1..7',
            '# tests 7',
            '# pass  7',
            '',
            '# ok',
        ].join('\n') + '\n\n');
        t.same(r.exitCode, 0);
        t.same(r.stderr.toString('utf8'), '');
        t.end();
    });
});

tap.test('async6', function (t) {
    runProgram('async-await', 'async6.js', function (r) {
        t.same(r.stdout.toString('utf8'), [
            'TAP version 13',
            '# async6: double end',
            'ok 1 good',
            '',
            '1..1',
            '# tests 1',
            '# pass  1',
            '',
            '# ok'
        ].join('\n') + '\n\n');
        t.same(r.exitCode, 0);
        t.same(r.stderr.toString('utf8'), '');
        t.end();
    });
});

tap.test('sync-error', function (t) {
    runProgram('async-await', 'sync-error.js', function (r) {
        t.same(stripFullStack(r.stdout.toString('utf8')), [
            'TAP version 13',
            '# sync-error',
            'ok 1 before throw',
            ''
        ].join('\n'));
        t.same(r.exitCode, 1);

        var stderr = r.stderr.toString('utf8');
        var lines = stderr.split('\n');
        lines = lines.filter(function (line) {
            return ! /\(timers.js:/.test(line) &&
                ! /\(internal\/timers.js:/.test(line) &&
                ! /Immediate\.next/.test(line);
        });
        stderr = lines.join('\n');

        t.same(stripFullStack(stderr), [
            '$TEST/async-await/sync-error.js:7',
            '    throw new Error(\'oopsie\');',
            '    ^',
            '',
            'Error: oopsie',
            '    at Test.myTest ($TEST/async-await/sync-error.js:$LINE:$COL)',
            '    at Test.bound [as _cb] ($TAPE/lib/test.js:$LINE:$COL)',
            '    at Test.run ($TAPE/lib/test.js:$LINE:$COL)',
            '    at Test.bound [as run] ($TAPE/lib/test.js:$LINE:$COL)',
            ''
        ].join('\n'));
        t.end();
    });
});

tap.test('async-error', function (t) {
    runProgram('async-await', 'async-error.js', function (r) {
        var stdout = r.stdout.toString('utf8');
        var lines = stdout.split('\n');
        lines = lines.filter(function (line) {
            return ! /^(\s+)at(\s+)<anonymous>$/.test(line);
        });
        stdout = lines.join('\n');

        t.same(stripFullStack(stdout.toString('utf8')), [
            'TAP version 13',
            '# async-error',
            'ok 1 before throw',
            'not ok 2 Error: oopsie',
            '  ---',
            '    operator: fail',
            '    stack: |-',
            '      Error: Error: oopsie',
            '          [... stack stripped ...]',
            '  ...',
            '',
            '1..2',
            '# tests 2',
            '# pass  1',
            '# fail  1',
            '',
            '',
        ].join('\n'));
        t.same(r.exitCode, 1);

        var stderr = r.stderr.toString('utf8');
        var lines = stderr.split('\n');
        lines = lines.filter(function (line) {
            return ! /\(timers.js:/.test(line) &&
                ! /\(internal\/timers.js:/.test(line) &&
                ! /Immediate\.next/.test(line);
        });
        stderr = lines.join('\n');

        t.same(stderr, '');
        t.end();
    });
});
