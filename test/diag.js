var tape = require('../');
var fs = require('fs');
var cp = require('child_process');

var expected = [
    'TAP version 13',
    '# beep',
    'ok 1 should be equal',
    '  ---',
    '  message: \'Some diagnostic message\'',
    '  data:',
    '    perf: 12.345',
    '    unit: seconds',
    '  ...',
    'ok 2 should be equivalent',
    '',
    '1..2',
    '# tests 2',
    '# pass  2',
    '',
    '# ok',
    '',
    ''
].join('\n');

var code = [
    'var test = require(\'../\');',
    '',
    'test(\'beep\', function(t){',
    '    t.plan(2);',
    '    t.ok(true, \'should be equal\');',
    '    t.diag({',
    '        message: \'Some diagnostic message\',',
    '        data: {',
    '            perf: 12.345,',
    '            unit: \'seconds\'',
    '        }',
    '    });',
    '    t.ok(true, \'should be equivalent\');',
    '});'
].join('\n');

fs.writeFileSync('diag-fixture.js', code, 'utf8');

tape('diag() method', function(t){
    t.plan(1);
    cp.exec('node ./diag-fixture.js', function(err, stdout, stderr) {
        t.equal(stdout, expected, 'Correct TAP output');
        fs.unlinkSync('diag-fixture.js');
    });
});
