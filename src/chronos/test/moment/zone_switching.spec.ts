// tslint:disable:max-line-length max-file-line-count prefer-const forin prefer-template one-variable-per-declaration newline-before-return
// tslint:disable:binary-expression-operand-order comment-format one-line no-var-keyword object-literal-shorthand
// tslint:disable:variable-name
import { assert } from 'chai';
import { moment } from '../chain';

describe('zone switching', () => {

it('local to utc, keepLocalTime = true', function () {
    var m = moment(),
        fmt = 'YYYY-DD-MM HH:mm:ss';
    assert.equal(m.clone().utc(true).format(fmt), m.format(fmt), 'local to utc failed to keep local time');
});

it('local to utc, keepLocalTime = false', function () {
    var m = moment();
    assert.equal(m.clone().utc().valueOf(), m.valueOf(), 'local to utc failed to keep utc time (implicit)');
    assert.equal(m.clone().utc(false).valueOf(), m.valueOf(), 'local to utc failed to keep utc time (explicit)');
});

// DEPRECATED
/*it('local to zone, keepLocalTime = true', function () {
    test.expectedDeprecations('moment().zone');
    var m = moment(),
        fmt = 'YYYY-DD-MM HH:mm:ss',
        z;

    // Apparently there is -12:00 and +14:00
    // https://en.wikipedia.org/wiki/UTC+14:00
    // https://en.wikipedia.org/wiki/UTC-12:00
    for (z = -12; z <= 14; ++z) {
        assert.equal(m.clone().zone(z * 60, true).format(fmt), m.format(fmt),
                'local to zone(' + z + ':00) failed to keep local time');
    }
});

// DEPRECATED
it('local to zone, keepLocalTime = false', function () {
    test.expectedDeprecations('moment().zone');
    var m = moment(),
        z;

    // Apparently there is -12:00 and +14:00
    // https://en.wikipedia.org/wiki/UTC+14:00
    // https://en.wikipedia.org/wiki/UTC-12:00
    for (z = -12; z <= 14; ++z) {
        assert.equal(m.clone().zone(z * 60).valueOf(), m.valueOf(),
                'local to zone(' + z + ':00) failed to keep utc time (implicit)');
        assert.equal(m.clone().zone(z * 60, false).valueOf(), m.valueOf(),
                'local to zone(' + z + ':00) failed to keep utc time (explicit)');
    }
});

it('utc to local, keepLocalTime = true', function () {
    // Don't test near the spring DST transition
    if (isNearSpringDST()) {
        expect(0);
        return;
    }

    var um = moment.utc(),
        fmt = 'YYYY-DD-MM HH:mm:ss';

    assert.equal(um.clone().local(true).format(fmt), um.format(fmt), 'utc to local failed to keep local time');
});*/

it('utc to local, keepLocalTime = false', function () {
    var um = moment.utc();
    assert.equal(um.clone().local().valueOf(), um.valueOf(), 'utc to local failed to keep utc time (implicit)');
    assert.equal(um.clone().local(false).valueOf(), um.valueOf(), 'utc to local failed to keep utc time (explicit)');
});

/*it('zone to local, keepLocalTime = true', function () {
    // Don't test near the spring DST transition
    if (isNearSpringDST()) {
        expect(0);
        return;
    }

    test.expectedDeprecations('moment().zone');

    var m = moment(),
        fmt = 'YYYY-DD-MM HH:mm:ss',
        z;

    // Apparently there is -12:00 and +14:00
    // https://en.wikipedia.org/wiki/UTC+14:00
    // https://en.wikipedia.org/wiki/UTC-12:00
    for (z = -12; z <= 14; ++z) {
        m.zone(z * 60);

        assert.equal(m.clone().local(true).format(fmt), m.format(fmt),
                'zone(' + z + ':00) to local failed to keep local time');
    }
});

it('zone to local, keepLocalTime = false', function () {
    test.expectedDeprecations('moment().zone');
    var m = moment(),
        z;

    // Apparently there is -12:00 and +14:00
    // https://en.wikipedia.org/wiki/UTC+14:00
    // https://en.wikipedia.org/wiki/UTC-12:00
    for (z = -12; z <= 14; ++z) {
        m.zone(z * 60);

        assert.equal(m.clone().local(false).valueOf(), m.valueOf(),
                'zone(' + z + ':00) to local failed to keep utc time (explicit)');
        assert.equal(m.clone().local().valueOf(), m.valueOf(),
                'zone(' + z + ':00) to local failed to keep utc time (implicit)');
    }
});*/
});
