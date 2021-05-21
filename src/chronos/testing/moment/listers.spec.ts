import { assertEq, assertDeepEq, assertOk } from '../test-helpers';
import { moment } from '../chain';

xdescribe('listers', () => {

  it('default', function () {
    assertDeepEq(moment.months(), ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']);
    assertDeepEq(moment.monthsShort(), ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']);
    assertDeepEq(moment.weekdays(), ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']);
    assertDeepEq(moment.weekdaysShort(), ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']);
    assertDeepEq(moment.weekdaysMin(), ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']);
  });

  it('index', function () {
    assertEq(moment.months(0), 'January');
    assertEq(moment.months(2), 'March');
    assertEq(moment.monthsShort(0), 'Jan');
    assertEq(moment.monthsShort(2), 'Mar');
    assertEq(moment.weekdays(0), 'Sunday');
    assertEq(moment.weekdays(2), 'Tuesday');
    assertEq(moment.weekdaysShort(0), 'Sun');
    assertEq(moment.weekdaysShort(2), 'Tue');
    assertEq(moment.weekdaysMin(0), 'Su');
    assertEq(moment.weekdaysMin(2), 'Tu');
  });

  xit('localized', function () {
    var months = 'one_two_three_four_five_six_seven_eight_nine_ten_eleven_twelve'.split('_'),
      monthsShort = 'on_tw_th_fo_fi_si_se_ei_ni_te_el_tw'.split('_'),
      weekdays = 'one_two_three_four_five_six_seven'.split('_'),
      weekdaysShort = 'on_tw_th_fo_fi_si_se'.split('_'),
      weekdaysMin = '1_2_3_4_5_6_7'.split('_'),
      weekdaysLocale = 'four_five_six_seven_one_two_three'.split('_'),
      weekdaysShortLocale = 'fo_fi_si_se_on_tw_th'.split('_'),
      weekdaysMinLocale = '4_5_6_7_1_2_3'.split('_'),
      week = {
        dow: 3,
        doy: 6
      };

    moment.locale('numerologists', {
      months: months,
      monthsShort: monthsShort,
      weekdays: weekdays,
      weekdaysShort: weekdaysShort,
      weekdaysMin: weekdaysMin,
      week: week
    });

    assertDeepEq(moment.months(), months);
    assertDeepEq(moment.monthsShort(), monthsShort);
    assertDeepEq(moment.weekdays(), weekdays);
    assertDeepEq(moment.weekdaysShort(), weekdaysShort);
    assertDeepEq(moment.weekdaysMin(), weekdaysMin);

    assertEq(moment.months(0), 'one');
    assertEq(moment.monthsShort(0), 'on');
    assertEq(moment.weekdays(0), 'one');
    assertEq(moment.weekdaysShort(0), 'on');
    assertEq(moment.weekdaysMin(0), '1');

    assertEq(moment.months(2), 'three');
    assertEq(moment.monthsShort(2), 'th');
    assertEq(moment.weekdays(2), 'three');
    assertEq(moment.weekdaysShort(2), 'th');
    assertEq(moment.weekdaysMin(2), '3');

    assertDeepEq(moment.weekdays(true), weekdaysLocale);
    assertDeepEq(moment.weekdaysShort(true), weekdaysShortLocale);
    assertDeepEq(moment.weekdaysMin(true), weekdaysMinLocale);

    assertEq(moment.weekdays(true, 0), 'four');
    assertEq(moment.weekdaysShort(true, 0), 'fo');
    assertEq(moment.weekdaysMin(true, 0), '4');

    assertEq(moment.weekdays(false, 2), 'three');
    assertEq(moment.weekdaysShort(false, 2), 'th');
    assertEq(moment.weekdaysMin(false, 2), '3');
  });

  // todo: not sure we need this
  xit('with functions', function () {
    var monthsShort = 'one_two_three_four_five_six_seven_eight_nine_ten_eleven_twelve'.split('_'),
      monthsShortWeird = 'onesy_twosy_threesy_foursy_fivesy_sixsy_sevensy_eightsy_ninesy_tensy_elevensy_twelvesy'.split('_');

    // moment.locale('difficult', {
    //   monthsShort: function (m: Date, format: string): string {
    //     var arr = format.match(/-MMM-/) ? monthsShortWeird : monthsShort;
    //     return arr[m.month()];
    //   }
    // });

    assertDeepEq(moment.monthsShort(), monthsShort);
    assertDeepEq(moment.monthsShort('MMM'), monthsShort);
    assertDeepEq(moment.monthsShort('-MMM-'), monthsShortWeird);

    assertDeepEq(moment.monthsShort('MMM', 2), 'three');
    assertDeepEq(moment.monthsShort('-MMM-', 2), 'threesy');
    assertDeepEq(moment.monthsShort(2), 'three');

    // moment.defineLocale('difficult', null);
  });

  it('with locale data', function () {
    var months = 'one_two_three_four_five_six_seven_eight_nine_ten_eleven_twelve'.split('_'),
      monthsShort = 'on_tw_th_fo_fi_si_se_ei_ni_te_el_tw'.split('_'),
      weekdays = 'one_two_three_four_five_six_seven'.split('_'),
      weekdaysShort = 'on_tw_th_fo_fi_si_se'.split('_'),
      weekdaysMin = '1_2_3_4_5_6_7'.split('_'),
      weekdaysLocale = 'four_five_six_seven_one_two_three'.split('_'),
      weekdaysShortLocale = 'fo_fi_si_se_on_tw_th'.split('_'),
      weekdaysMinLocale = '4_5_6_7_1_2_3'.split('_'),
      week = {
        dow: 3,
        doy: 6
      };

    var customLocale = moment.localeData('numerologists');

    assertDeepEq(customLocale.months(), months);
    assertDeepEq(customLocale.monthsShort(), monthsShort);
    assertDeepEq(customLocale.weekdays(), weekdays);
    assertDeepEq(customLocale.weekdaysShort(), weekdaysShort);
    assertDeepEq(customLocale.weekdaysMin(), weekdaysMin);
  });
});
