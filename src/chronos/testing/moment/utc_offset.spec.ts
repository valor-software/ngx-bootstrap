import { assertEq, assertDeepEq, assertOk } from '../test-helpers';
import { moment } from '../chain';

describe('utc offset', () => {

  it('setter / getter blackbox', function () {
    var m = moment([2010]);

    assertEq(m.clone().utcOffset(0).utcOffset(), 0, 'utcOffset 0');

    assertEq(m.clone().utcOffset(1).utcOffset(), 60, 'utcOffset 1 is 60');
    assertEq(m.clone().utcOffset(60).utcOffset(), 60, 'utcOffset 60');
    assertEq(m.clone().utcOffset('+01:00').utcOffset(), 60, 'utcOffset +01:00 is 60');
    assertEq(m.clone().utcOffset('+0100').utcOffset(), 60, 'utcOffset +0100 is 60');

    assertEq(m.clone().utcOffset(-1).utcOffset(), -60, 'utcOffset -1 is -60');
    assertEq(m.clone().utcOffset(-60).utcOffset(), -60, 'utcOffset -60');
    assertEq(m.clone().utcOffset('-01:00').utcOffset(), -60, 'utcOffset -01:00 is -60');
    assertEq(m.clone().utcOffset('-0100').utcOffset(), -60, 'utcOffset -0100 is -60');

    assertEq(m.clone().utcOffset(1.5).utcOffset(), 90, 'utcOffset 1.5 is 90');
    assertEq(m.clone().utcOffset(90).utcOffset(), 90, 'utcOffset 1.5 is 90');
    assertEq(m.clone().utcOffset('+01:30').utcOffset(), 90, 'utcOffset +01:30 is 90');
    assertEq(m.clone().utcOffset('+0130').utcOffset(), 90, 'utcOffset +0130 is 90');

    assertEq(m.clone().utcOffset(-1.5).utcOffset(), -90, 'utcOffset -1.5');
    assertEq(m.clone().utcOffset(-90).utcOffset(), -90, 'utcOffset -90');
    assertEq(m.clone().utcOffset('-01:30').utcOffset(), -90, 'utcOffset +01:30 is 90');
    assertEq(m.clone().utcOffset('-0130').utcOffset(), -90, 'utcOffset +0130 is 90');
    assertEq(m.clone().utcOffset('+00:10').utcOffset(), 10, 'utcOffset +00:10 is 10');
    assertEq(m.clone().utcOffset('-00:10').utcOffset(), -10, 'utcOffset +00:10 is 10');
    assertEq(m.clone().utcOffset('+0010').utcOffset(), 10, 'utcOffset +0010 is 10');
    assertEq(m.clone().utcOffset('-0010').utcOffset(), -10, 'utcOffset +0010 is 10');
  });

  it('utcOffset shorthand hours -> minutes', function () {
    var i;
    for (i = -15; i <= 15; ++i) {
      assertEq(moment().utcOffset(i).utcOffset(), i * 60,
        '' + i + ' -> ' + i * 60);
    }
    assertEq(moment().utcOffset(-16).utcOffset(), -16, '-16 -> -16');
    assertEq(moment().utcOffset(16).utcOffset(), 16, '16 -> 16');
  });

  it('isLocal, isUtc, isUtcOffset', function () {
    assertOk(moment().isLocal(), 'moment() creates objects in local time');
    assertOk(!moment.utc().isLocal(), 'moment.utc creates objects NOT in local time');
    assertOk(moment.utc().local().isLocal(), 'moment.fn.local() converts to local time');
    assertOk(!moment().utcOffset(5).isLocal(), 'moment.fn.utcOffset(N) puts objects NOT in local time');
    assertOk(moment().utcOffset(5).local().isLocal(), 'moment.fn.local() converts to local time');

    assertOk(moment.utc().isUtc(), 'moment.utc() creates objects in utc time');
    assertOk(moment().utcOffset(0).isUtc(), 'utcOffset(0) is equivalent to utc mode');
    assertOk(!moment().utcOffset(1).isUtc(), 'utcOffset(1) is NOT equivalent to utc mode');

    assertOk(!moment().isUtcOffset(), 'moment() creates objects NOT in utc-offset mode');
    assertOk(moment.utc().isUtcOffset(), 'moment.utc() creates objects in utc-offset mode');
    assertOk(moment().utcOffset(3).isUtcOffset(), 'utcOffset(N != 0) creates objects in utc-offset mode');
    assertOk(moment().utcOffset(0).isUtcOffset(), 'utcOffset(0) creates objects in utc-offset mode');
  });

  it('isUTC', function () {
    assertOk(moment.utc().isUTC(), 'moment.utc() creates objects in utc time');
    assertOk(moment().utcOffset(0).isUTC(), 'utcOffset(0) is equivalent to utc mode');
    assertOk(!moment().utcOffset(1).isUTC(), 'utcOffset(1) is NOT equivalent to utc mode');
  });

  it('change hours when changing the utc offset', function () {
    var m = moment.utc([2000, 0, 1, 6]);
    assertEq(m.hour(), 6, 'UTC 6AM should be 6AM at +0000');

    // sanity check
    m.utcOffset(0);
    assertEq(m.hour(), 6, 'UTC 6AM should be 6AM at +0000');

    m.utcOffset(-60);
    assertEq(m.hour(), 5, 'UTC 6AM should be 5AM at -0100');

    m.utcOffset(60);
    assertEq(m.hour(), 7, 'UTC 6AM should be 7AM at +0100');
  });

  it('change minutes when changing the utc offset', function () {
    var m = moment.utc([2000, 0, 1, 6, 31]);

    m.utcOffset(0);
    assertEq(m.format('HH:mm'), '06:31', 'UTC 6:31AM should be 6:31AM at +0000');

    m.utcOffset(-30);
    assertEq(m.format('HH:mm'), '06:01', 'UTC 6:31AM should be 6:01AM at -0030');

    m.utcOffset(30);
    assertEq(m.format('HH:mm'), '07:01', 'UTC 6:31AM should be 7:01AM at +0030');

    m.utcOffset(-1380);
    assertEq(m.format('HH:mm'), '07:31', 'UTC 6:31AM should be 7:31AM at +1380');
  });

  it('distance from the unix epoch', function () {
    var zoneA = moment(),
      zoneB = moment(zoneA),
      zoneC = moment(zoneA),
      zoneD = moment(zoneA),
      zoneE = moment(zoneA);

    zoneB.utc();
    assertEq(+zoneA, +zoneB, 'moment should equal moment.utc');

    zoneC.utcOffset(60);
    assertEq(+zoneA, +zoneC, 'moment should equal moment.utcOffset(60)');

    zoneD.utcOffset(-480);
    assertEq(+zoneA, +zoneD,
      'moment should equal moment.utcOffset(-480)');

    zoneE.utcOffset(-1000);
    assertEq(+zoneA, +zoneE,
      'moment should equal moment.utcOffset(-1000)');
  });

  // TODO: use sinon
  xit('update offset after changing any values', function () {
    var oldOffset = moment.updateOffset,
      m = moment.utc([2000, 6, 1]);


    // moment.updateOffset = function (mom, keepTime) {
    //   if (mom.__doChange) {
    //     if (+mom > 962409600000) {
    //       mom.utcOffset(-120, keepTime);
    //     } else {
    //       mom.utcOffset(-60, keepTime);
    //     }
    //   }
    // };

    assertEq(m.format('ZZ'), '+0000', 'should be at +0000');
    assertEq(m.format('HH:mm'), '00:00', 'should start 12AM at +0000 timezone');

    // m.__doChange = true;
    m.add(1, 'h');

    assertEq(m.format('ZZ'), '-0200', 'should be at -0200');
    assertEq(m.format('HH:mm'), '23:00', '1AM at +0000 should be 11PM at -0200 timezone');

    m.subtract(1, 'h');

    assertEq(m.format('ZZ'), '-0100', 'should be at -0100');
    assertEq(m.format('HH:mm'), '23:00', '12AM at +0000 should be 11PM at -0100 timezone');

    moment.updateOffset = oldOffset;
  });

//////////////////
  it('getters and setters', function () {
    var a = moment([2011, 5, 20]);

    assertEq(a.clone().utcOffset(-120).year(2012).year(), 2012, 'should get and set year correctly');
    assertEq(a.clone().utcOffset(-120).month(1).month(), 1, 'should get and set month correctly');
    assertEq(a.clone().utcOffset(-120).date(2).date(), 2, 'should get and set date correctly');
    assertEq(a.clone().utcOffset(-120).day(1).day(), 1, 'should get and set day correctly');
    assertEq(a.clone().utcOffset(-120).hour(1).hour(), 1, 'should get and set hour correctly');
    assertEq(a.clone().utcOffset(-120).minute(1).minute(), 1, 'should get and set minute correctly');
  });

  it('getters', function () {
    var a = moment.utc([2012, 0, 1, 0, 0, 0]);

    assertEq(a.clone().utcOffset(-120).year(), 2011, 'should get year correctly');
    assertEq(a.clone().utcOffset(-120).month(), 11, 'should get month correctly');
    assertEq(a.clone().utcOffset(-120).date(), 31, 'should get date correctly');
    assertEq(a.clone().utcOffset(-120).hour(), 22, 'should get hour correctly');
    assertEq(a.clone().utcOffset(-120).minute(), 0, 'should get minute correctly');

    assertEq(a.clone().utcOffset(120).year(), 2012, 'should get year correctly');
    assertEq(a.clone().utcOffset(120).month(), 0, 'should get month correctly');
    assertEq(a.clone().utcOffset(120).date(), 1, 'should get date correctly');
    assertEq(a.clone().utcOffset(120).hour(), 2, 'should get hour correctly');
    assertEq(a.clone().utcOffset(120).minute(), 0, 'should get minute correctly');

    assertEq(a.clone().utcOffset(90).year(), 2012, 'should get year correctly');
    assertEq(a.clone().utcOffset(90).month(), 0, 'should get month correctly');
    assertEq(a.clone().utcOffset(90).date(), 1, 'should get date correctly');
    assertEq(a.clone().utcOffset(90).hour(), 1, 'should get hour correctly');
    assertEq(a.clone().utcOffset(90).minute(), 30, 'should get minute correctly');
  });


  it('from', function () {
    var zoneA = moment(),
      zoneB = moment(zoneA).utcOffset(-720),
      zoneC = moment(zoneA).utcOffset(-360),
      zoneD = moment(zoneA).utcOffset(690),
      other = moment(zoneA).add(35, 'm');

    assertEq(zoneA.from(other), zoneB.from(other), 'moment#from should be the same in all zones');
    assertEq(zoneA.from(other), zoneC.from(other), 'moment#from should be the same in all zones');
    assertEq(zoneA.from(other), zoneD.from(other), 'moment#from should be the same in all zones');
  });

  it('diff', function () {
    var zoneA = moment(),
      zoneB = moment(zoneA).utcOffset(-720),
      zoneC = moment(zoneA).utcOffset(-360),
      zoneD = moment(zoneA).utcOffset(690),
      other = moment(zoneA).add(35, 'm');

    assertEq(zoneA.diff(other), zoneB.diff(other), 'moment#diff should be the same in all zones');
    assertEq(zoneA.diff(other), zoneC.diff(other), 'moment#diff should be the same in all zones');
    assertEq(zoneA.diff(other), zoneD.diff(other), 'moment#diff should be the same in all zones');

    assertEq(zoneA.diff(other, 'minute', true), zoneB.diff(other, 'minute', true), 'moment#diff should be the same in all zones');
    assertEq(zoneA.diff(other, 'minute', true), zoneC.diff(other, 'minute', true), 'moment#diff should be the same in all zones');
    assertEq(zoneA.diff(other, 'minute', true), zoneD.diff(other, 'minute', true), 'moment#diff should be the same in all zones');

    assertEq(zoneA.diff(other, 'hour', true), zoneB.diff(other, 'hour', true), 'moment#diff should be the same in all zones');
    assertEq(zoneA.diff(other, 'hour', true), zoneC.diff(other, 'hour', true), 'moment#diff should be the same in all zones');
    assertEq(zoneA.diff(other, 'hour', true), zoneD.diff(other, 'hour', true), 'moment#diff should be the same in all zones');
  });

  it('unix offset and timestamp', function () {
    var zoneA = moment(),
      zoneB = moment(zoneA).utcOffset(-720),
      zoneC = moment(zoneA).utcOffset(-360),
      zoneD = moment(zoneA).utcOffset(690);

    assertEq(zoneA.unix(), zoneB.unix(), 'moment#unix should be the same in all zones');
    assertEq(zoneA.unix(), zoneC.unix(), 'moment#unix should be the same in all zones');
    assertEq(zoneA.unix(), zoneD.unix(), 'moment#unix should be the same in all zones');

    assertEq(+zoneA, +zoneB, 'moment#valueOf should be the same in all zones');
    assertEq(+zoneA, +zoneC, 'moment#valueOf should be the same in all zones');
    assertEq(+zoneA, +zoneD, 'moment#valueOf should be the same in all zones');
  });

  it('cloning', function () {
    assertEq(moment().utcOffset(-120).clone().utcOffset(), -120,
      'explicit cloning should retain the offset');
    assertEq(moment().utcOffset(120).clone().utcOffset(), 120,
      'explicit cloning should retain the offset');
    assertEq(moment(moment().utcOffset(-120)).utcOffset(), -120,
      'implicit cloning should retain the offset');
    assertEq(moment(moment().utcOffset(120)).utcOffset(), 120,
      'implicit cloning should retain the offset');
  });

  it('start of / end of', function () {
    var a = moment.utc([2010, 1, 2, 0, 0, 0]).utcOffset(-450);

    assertEq(a.clone().startOf('day').hour(), 0,
      'start of day should work on moments with utc offset');
    assertEq(a.clone().startOf('day').minute(), 0,
      'start of day should work on moments with utc offset');
    assertEq(a.clone().startOf('hour').minute(), 0,
      'start of hour should work on moments with utc offset');

    assertEq(a.clone().endOf('day').hour(), 23,
      'end of day should work on moments with utc offset');
    assertEq(a.clone().endOf('day').minute(), 59,
      'end of day should work on moments with utc offset');
    assertEq(a.clone().endOf('hour').minute(), 59,
      'end of hour should work on moments with utc offset');
  });

  it('reset offset with moment#utc', function () {
    var a = moment.utc([2012]).utcOffset(-480);

    assertEq(a.clone().hour(), 16, 'different utc offset should have different hour');
    assertEq(a.clone().utc().hour(), 0, 'calling moment#utc should reset the offset');
  });

  it('reset offset with moment#local', function () {
    var a = moment([2012]).utcOffset(-480);

    assertEq(a.clone().local().hour(), 0, 'calling moment#local should reset the offset');
  });

  it('toDate', function () {
    var zoneA = new Date(),
      zoneB = moment(zoneA).utcOffset(-720).toDate(),
      zoneC = moment(zoneA).utcOffset(-360).toDate(),
      zoneD = moment(zoneA).utcOffset(690).toDate();

    assertEq(+zoneA, +zoneB, 'moment#toDate should output a date with the right unix timestamp');
    assertEq(+zoneA, +zoneC, 'moment#toDate should output a date with the right unix timestamp');
    assertEq(+zoneA, +zoneD, 'moment#toDate should output a date with the right unix timestamp');
  });

  it('same / before / after', function () {
    var zoneA = moment().utc(),
      zoneB = moment(zoneA).utcOffset(-120),
      zoneC = moment(zoneA).utcOffset(120);

    assertOk(zoneA.isSame(zoneB), 'two moments with different offsets should be the same');
    assertOk(zoneA.isSame(zoneC), 'two moments with different offsets should be the same');

    assertOk(zoneA.isSame(zoneB, 'hour'), 'two moments with different offsets should be the same hour');
    assertOk(zoneA.isSame(zoneC, 'hour'), 'two moments with different offsets should be the same hour');

    zoneA.add(1, 'hour');

    assertOk(zoneA.isAfter(zoneB), 'isAfter should work with two moments with different offsets');
    assertOk(zoneA.isAfter(zoneC), 'isAfter should work with two moments with different offsets');

    assertOk(zoneA.isAfter(zoneB, 'hour'), 'isAfter:hour should work with two moments with different offsets');
    assertOk(zoneA.isAfter(zoneC, 'hour'), 'isAfter:hour should work with two moments with different offsets');

    zoneA.subtract(2, 'hour');

    assertOk(zoneA.isBefore(zoneB), 'isBefore should work with two moments with different offsets');
    assertOk(zoneA.isBefore(zoneC), 'isBefore should work with two moments with different offsets');

    assertOk(zoneA.isBefore(zoneB, 'hour'), 'isBefore:hour should work with two moments with different offsets');
    assertOk(zoneA.isBefore(zoneC, 'hour'), 'isBefore:hour should work with two moments with different offsets');
  });

  // todo: use sinon
  xit('add / subtract over dst', function () {
    var oldOffset = moment.updateOffset,
      m = moment.utc([2000, 2, 31, 3]);

    moment.updateOffset = function (mom, keepTime) {
      if (mom.clone().utc().month() > 2) {
        mom.utcOffset(60, keepTime);
      } else {
        mom.utcOffset(0, keepTime);
      }
    };

    assertEq(m.hour(), 3, 'should start at 00:00');

    m.add(24, 'hour');

    assertEq(m.hour(), 4, 'adding 24 hours should disregard dst');

    m.subtract(24, 'hour');

    assertEq(m.hour(), 3, 'subtracting 24 hours should disregard dst');

    m.add(1, 'day');

    assertEq(m.hour(), 3, 'adding 1 day should have the same hour');

    m.subtract(1, 'day');

    assertEq(m.hour(), 3, 'subtracting 1 day should have the same hour');

    m.add(1, 'month');

    assertEq(m.hour(), 3, 'adding 1 month should have the same hour');

    m.subtract(1, 'month');

    assertEq(m.hour(), 3, 'subtracting 1 month should have the same hour');

    moment.updateOffset = oldOffset;
  });

  // todo: use sinon
  xit('isDST', function () {
    var oldOffset = moment.updateOffset;

    // moment.updateOffset = function (mom, keepTime) {
    //   if (mom.month() > 2 && mom.month() < 9) {
    //     mom.utcOffset(60, keepTime);
    //   } else {
    //     mom.utcOffset(0, keepTime);
    //   }
    // };

    assertOk(!moment().month(0).isDST(), 'Jan should not be summer dst');
    assertOk(moment().month(6).isDST(), 'Jul should be summer dst');
    assertOk(!moment().month(11).isDST(), 'Dec should not be summer dst');

    moment.updateOffset = function (mom) {
      if (mom.month() > 2 && mom.month() < 9) {
        mom.utcOffset(0);
      } else {
        mom.utcOffset(60);
      }
    };

    assertOk(moment().month(0).isDST(), 'Jan should be winter dst');
    assertOk(!moment().month(6).isDST(), 'Jul should not be winter dst');
    assertOk(moment().month(11).isDST(), 'Dec should be winter dst');

    moment.updateOffset = oldOffset;
  });

  it('zone names', function () {
    assertEq(moment().zoneAbbr(), '', 'Local zone abbr should be empty');
    assertEq(moment().format('z'), '', 'Local zone formatted abbr should be empty');
    assertEq(moment().zoneName(), '', 'Local zone name should be empty');
    assertEq(moment().format('zz'), '', 'Local zone formatted name should be empty');

    assertEq(moment.utc().zoneAbbr(), 'UTC', 'UTC zone abbr should be UTC');
    assertEq(moment.utc().format('z'), 'UTC', 'UTC zone formatted abbr should be UTC');
    assertEq(moment.utc().zoneName(), 'Coordinated Universal Time', 'UTC zone abbr should be Coordinated Universal Time');
    assertEq(moment.utc().format('zz'), 'Coordinated Universal Time', 'UTC zone formatted abbr should be Coordinated Universal Time');
  });

  xit('hours alignment with UTC', function () {
    assertEq(moment().utcOffset(-120).hasAlignedHourOffset(), true);
    assertEq(moment().utcOffset(180).hasAlignedHourOffset(), true);
    assertEq(moment().utcOffset(-90).hasAlignedHourOffset(), false);
    assertEq(moment().utcOffset(90).hasAlignedHourOffset(), false);
  });

  xit('hours alignment with other zone', function () {
    var m = moment().utcOffset(-120);

    assertEq(m.hasAlignedHourOffset(moment().utcOffset(-180)), true);
    assertEq(m.hasAlignedHourOffset(moment().utcOffset(180)), true);
    assertEq(m.hasAlignedHourOffset(moment().utcOffset(-90)), false);
    assertEq(m.hasAlignedHourOffset(moment().utcOffset(90)), false);

    m = moment().utcOffset(-90);

    assertEq(m.hasAlignedHourOffset(moment().utcOffset(-180)), false);
    assertEq(m.hasAlignedHourOffset(moment().utcOffset(180)), false);
    assertEq(m.hasAlignedHourOffset(moment().utcOffset(-30)), true);
    assertEq(m.hasAlignedHourOffset(moment().utcOffset(30)), true);

    m = moment().utcOffset(60);

    assertEq(m.hasAlignedHourOffset(moment().utcOffset(-180)), true);
    assertEq(m.hasAlignedHourOffset(moment().utcOffset(180)), true);
    assertEq(m.hasAlignedHourOffset(moment().utcOffset(-90)), false);
    assertEq(m.hasAlignedHourOffset(moment().utcOffset(90)), false);

    m = moment().utcOffset(-25);

    assertEq(m.hasAlignedHourOffset(moment().utcOffset(35)), true);
    assertEq(m.hasAlignedHourOffset(moment().utcOffset(-85)), true);

    assertEq(m.hasAlignedHourOffset(moment().utcOffset(-35)), false);
    assertEq(m.hasAlignedHourOffset(moment().utcOffset(85)), false);
  });

  it('parse zone', function () {
    var m = moment('2013-01-01T00:00:00-13:00').parseZone();
    assertEq(m.utcOffset(), -13 * 60);
    assertEq(m.hours(), 0);
  });

  it('parse UTC zone', function () {
    var m = moment('2013-01-01T05:00:00+00:00').parseZone();
    assertEq(m.utcOffset(), 0);
    assertEq(m.hours(), 5);
  });

  it('parse zone static', function () {
    var m = moment.parseZone('2013-01-01T00:00:00-13:00');
    assertEq(m.utcOffset(), -13 * 60);
    assertEq(m.hours(), 0);
  });

  xit('parse zone with more arguments', function () {
    var m;
    m = moment.parseZone('2013 01 01 05 -13:00', 'YYYY MM DD HH ZZ');
    assertEq(m.format(), '2013-01-01T05:00:00-13:00', 'accept input and format');
    m = moment.parseZone('2013-01-01-13:00', 'YYYY MM DD ZZ', true);
    assertEq(m.isValid(), false, 'accept input, format and strict flag');
    m = moment.parseZone('2013-01-01-13:00', ['DD MM YYYY ZZ', 'YYYY MM DD ZZ']);
    assertEq(m.format(), '2013-01-01T00:00:00-13:00', 'accept input and array of formats');
  });

  it('parse zone with a timezone from the format string', function () {
    var m = moment('11-12-2013 -0400 +1100', 'DD-MM-YYYY ZZ #####').parseZone();

    assertEq(m.utcOffset(), -4 * 60);
  });

  xit('parse zone without a timezone included in the format string', function () {
    var m = moment('11-12-2013 -0400 +1100', 'DD-MM-YYYY').parseZone();

    assertEq(m.utcOffset(), 11 * 60);
  });

  it('timezone format', function () {
    assertEq(moment().utcOffset(60).format('ZZ'), '+0100', '-60 -> +0100');
    assertEq(moment().utcOffset(90).format('ZZ'), '+0130', '-90 -> +0130');
    assertEq(moment().utcOffset(120).format('ZZ'), '+0200', '-120 -> +0200');

    assertEq(moment().utcOffset(-60).format('ZZ'), '-0100', '+60 -> -0100');
    assertEq(moment().utcOffset(-90).format('ZZ'), '-0130', '+90 -> -0130');
    assertEq(moment().utcOffset(-120).format('ZZ'), '-0200', '+120 -> -0200');
  });
});
