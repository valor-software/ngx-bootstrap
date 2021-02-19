import { assertEq, assertDeepEq, assertOk } from '../test-helpers';
import { moment } from '../chain';

describe('zone switching', () => {

it('local to utc, keepLocalTime = true', function () {
    var m = moment(),
        fmt = 'YYYY-DD-MM HH:mm:ss';
    assertEq(m.clone().utc(true).format(fmt), m.format(fmt), 'local to utc failed to keep local time');
});

it('local to utc, keepLocalTime = false', function () {
    var m = moment();
    assertEq(m.clone().utc().valueOf(), m.valueOf(), 'local to utc failed to keep utc time (implicit)');
    assertEq(m.clone().utc(false).valueOf(), m.valueOf(), 'local to utc failed to keep utc time (explicit)');
});

// DEPRECATED
/*it('local to zone, keepLocalTime = true', function () {
    testing.expectedDeprecations('moment().zone');
    var m = moment(),
        fmt = 'YYYY-DD-MM HH:mm:ss',
        z;

    // Apparently there is -12:00 and +14:00
    // https://en.wikipedia.org/wiki/UTC+14:00
    // https://en.wikipedia.org/wiki/UTC-12:00
    for (z = -12; z <= 14; ++z) {
        assertEq(m.clone().zone(z * 60, true).format(fmt), m.format(fmt),
                'local to zone(' + z + ':00) failed to keep local time');
    }
});

// DEPRECATED
it('local to zone, keepLocalTime = false', function () {
    testing.expectedDeprecations('moment().zone');
    var m = moment(),
        z;

    // Apparently there is -12:00 and +14:00
    // https://en.wikipedia.org/wiki/UTC+14:00
    // https://en.wikipedia.org/wiki/UTC-12:00
    for (z = -12; z <= 14; ++z) {
        assertEq(m.clone().zone(z * 60).valueOf(), m.valueOf(),
                'local to zone(' + z + ':00) failed to keep utc time (implicit)');
        assertEq(m.clone().zone(z * 60, false).valueOf(), m.valueOf(),
                'local to zone(' + z + ':00) failed to keep utc time (explicit)');
    }
});

it('utc to local, keepLocalTime = true', function () {
    // Don't testing near the spring DST transition
    if (isNearSpringDST()) {
        expect(0);
        return;
    }

    var um = moment.utc(),
        fmt = 'YYYY-DD-MM HH:mm:ss';

    assertEq(um.clone().local(true).format(fmt), um.format(fmt), 'utc to local failed to keep local time');
});*/

it('utc to local, keepLocalTime = false', function () {
    var um = moment.utc();
    assertEq(um.clone().local().valueOf(), um.valueOf(), 'utc to local failed to keep utc time (implicit)');
    assertEq(um.clone().local(false).valueOf(), um.valueOf(), 'utc to local failed to keep utc time (explicit)');
});

/*it('zone to local, keepLocalTime = true', function () {
    // Don't testing near the spring DST transition
    if (isNearSpringDST()) {
        expect(0);
        return;
    }

    testing.expectedDeprecations('moment().zone');

    var m = moment(),
        fmt = 'YYYY-DD-MM HH:mm:ss',
        z;

    // Apparently there is -12:00 and +14:00
    // https://en.wikipedia.org/wiki/UTC+14:00
    // https://en.wikipedia.org/wiki/UTC-12:00
    for (z = -12; z <= 14; ++z) {
        m.zone(z * 60);

        assertEq(m.clone().local(true).format(fmt), m.format(fmt),
                'zone(' + z + ':00) to local failed to keep local time');
    }
});

it('zone to local, keepLocalTime = false', function () {
    testing.expectedDeprecations('moment().zone');
    var m = moment(),
        z;

    // Apparently there is -12:00 and +14:00
    // https://en.wikipedia.org/wiki/UTC+14:00
    // https://en.wikipedia.org/wiki/UTC-12:00
    for (z = -12; z <= 14; ++z) {
        m.zone(z * 60);

        assertEq(m.clone().local(false).valueOf(), m.valueOf(),
                'zone(' + z + ':00) to local failed to keep utc time (explicit)');
        assertEq(m.clone().local().valueOf(), m.valueOf(),
                'zone(' + z + ':00) to local failed to keep utc time (implicit)');
    }
});*/
});
