import { assertEq, assertDeepEq, assertOk } from '../test-helpers';
import { moment } from '../chain';
import { defineLocale } from '../../locale/locales';

describe('weeks in year', () => {

  it('isoWeeksInYear', function () {
    assertEq(moment([2004]).isoWeeksInYear(), 53, '2004 has 53 iso weeks');
    assertEq(moment([2005]).isoWeeksInYear(), 52, '2005 has 53 iso weeks');
    assertEq(moment([2006]).isoWeeksInYear(), 52, '2006 has 53 iso weeks');
    assertEq(moment([2007]).isoWeeksInYear(), 52, '2007 has 52 iso weeks');
    assertEq(moment([2008]).isoWeeksInYear(), 52, '2008 has 53 iso weeks');
    assertEq(moment([2009]).isoWeeksInYear(), 53, '2009 has 53 iso weeks');
    assertEq(moment([2010]).isoWeeksInYear(), 52, '2010 has 52 iso weeks');
    assertEq(moment([2011]).isoWeeksInYear(), 52, '2011 has 52 iso weeks');
    assertEq(moment([2012]).isoWeeksInYear(), 52, '2012 has 52 iso weeks');
    assertEq(moment([2013]).isoWeeksInYear(), 52, '2013 has 52 iso weeks');
    assertEq(moment([2014]).isoWeeksInYear(), 52, '2014 has 52 iso weeks');
    assertEq(moment([2015]).isoWeeksInYear(), 53, '2015 has 53 iso weeks');
  });

  it('weeksInYear doy/dow = 1/4', function () {
    moment.locale('1/4', { week: { dow: 1, doy: 4 } });

    assertEq(moment([2004]).weeksInYear(), 53, '2004 has 53 weeks');
    assertEq(moment([2005]).weeksInYear(), 52, '2005 has 53 weeks');
    assertEq(moment([2006]).weeksInYear(), 52, '2006 has 53 weeks');
    assertEq(moment([2007]).weeksInYear(), 52, '2007 has 52 weeks');
    assertEq(moment([2008]).weeksInYear(), 52, '2008 has 53 weeks');
    assertEq(moment([2009]).weeksInYear(), 53, '2009 has 53 weeks');
    assertEq(moment([2010]).weeksInYear(), 52, '2010 has 52 weeks');
    assertEq(moment([2011]).weeksInYear(), 52, '2011 has 52 weeks');
    assertEq(moment([2012]).weeksInYear(), 52, '2012 has 52 weeks');
    assertEq(moment([2013]).weeksInYear(), 52, '2013 has 52 weeks');
    assertEq(moment([2014]).weeksInYear(), 52, '2014 has 52 weeks');
    assertEq(moment([2015]).weeksInYear(), 53, '2015 has 53 weeks');

    defineLocale('1/4', null);
  });

  it('weeksInYear doy/dow = 6/12', function () {
    moment.locale('6/12', { week: { dow: 6, doy: 12 } });

    assertEq(moment([2004]).weeksInYear(), 53, '2004 has 53 weeks');
    assertEq(moment([2005]).weeksInYear(), 52, '2005 has 53 weeks');
    assertEq(moment([2006]).weeksInYear(), 52, '2006 has 53 weeks');
    assertEq(moment([2007]).weeksInYear(), 52, '2007 has 52 weeks');
    assertEq(moment([2008]).weeksInYear(), 52, '2008 has 53 weeks');
    assertEq(moment([2009]).weeksInYear(), 52, '2009 has 53 weeks');
    assertEq(moment([2010]).weeksInYear(), 53, '2010 has 52 weeks');
    assertEq(moment([2011]).weeksInYear(), 52, '2011 has 52 weeks');
    assertEq(moment([2012]).weeksInYear(), 52, '2012 has 52 weeks');
    assertEq(moment([2013]).weeksInYear(), 52, '2013 has 52 weeks');
    assertEq(moment([2014]).weeksInYear(), 52, '2014 has 52 weeks');
    assertEq(moment([2015]).weeksInYear(), 52, '2015 has 53 weeks');

    defineLocale('6/12', null);
  });

  it('weeksInYear doy/dow = 1/7', function () {
    moment.locale('1/7', { week: { dow: 1, doy: 7 } });

    assertEq(moment([2004]).weeksInYear(), 52, '2004 has 53 weeks');
    assertEq(moment([2005]).weeksInYear(), 52, '2005 has 53 weeks');
    assertEq(moment([2006]).weeksInYear(), 53, '2006 has 53 weeks');
    assertEq(moment([2007]).weeksInYear(), 52, '2007 has 52 weeks');
    assertEq(moment([2008]).weeksInYear(), 52, '2008 has 53 weeks');
    assertEq(moment([2009]).weeksInYear(), 52, '2009 has 53 weeks');
    assertEq(moment([2010]).weeksInYear(), 52, '2010 has 52 weeks');
    assertEq(moment([2011]).weeksInYear(), 52, '2011 has 52 weeks');
    assertEq(moment([2012]).weeksInYear(), 53, '2012 has 52 weeks');
    assertEq(moment([2013]).weeksInYear(), 52, '2013 has 52 weeks');
    assertEq(moment([2014]).weeksInYear(), 52, '2014 has 52 weeks');
    assertEq(moment([2015]).weeksInYear(), 52, '2015 has 53 weeks');

    defineLocale('1/7', null);
  });

  it('weeksInYear doy/dow = 0/6', function () {
    moment.locale('0/6', { week: { dow: 0, doy: 6 } });

    assertEq(moment([2004]).weeksInYear(), 52, '2004 has 53 weeks');
    assertEq(moment([2005]).weeksInYear(), 53, '2005 has 53 weeks');
    assertEq(moment([2006]).weeksInYear(), 52, '2006 has 53 weeks');
    assertEq(moment([2007]).weeksInYear(), 52, '2007 has 52 weeks');
    assertEq(moment([2008]).weeksInYear(), 52, '2008 has 53 weeks');
    assertEq(moment([2009]).weeksInYear(), 52, '2009 has 53 weeks');
    assertEq(moment([2010]).weeksInYear(), 52, '2010 has 52 weeks');
    assertEq(moment([2011]).weeksInYear(), 53, '2011 has 52 weeks');
    assertEq(moment([2012]).weeksInYear(), 52, '2012 has 52 weeks');
    assertEq(moment([2013]).weeksInYear(), 52, '2013 has 52 weeks');
    assertEq(moment([2014]).weeksInYear(), 52, '2014 has 52 weeks');
    assertEq(moment([2015]).weeksInYear(), 52, '2015 has 53 weeks');

    defineLocale('0/6', null);
  });
});
