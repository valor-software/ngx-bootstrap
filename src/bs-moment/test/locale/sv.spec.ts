import { defineLocale } from '../../locale/locales';
import { sv } from '../../i18n/sv';
import { formatDate } from '../../format';

const localeAbbr = 'sv';

describe('moment - locale: sv', () => {
  defineLocale(localeAbbr, sv);
  it('format', () => {
    const expected: string[][] = [
      [
        'dddd, MMMM Do YYYY, h:mm:ss a',
        'söndag, februari 14e 2010, 3:25:50 pm'
      ],
      ['ddd, hA', 'sön, 3PM'],
      ['M Mo MM MMMM MMM', '2 2a 02 februari feb'],
      ['YYYY YY', '2010 10'],
      ['D Do DD', '14 14e 14'],
      ['d do dddd ddd dd', '0 0e söndag sön sö'],
      ['DDD DDDo DDDD', '45 45e 045'],
      ['w wo ww', '6 6e 06'],
      ['h hh', '3 03'],
      ['H HH', '15 15'],
      ['m mm', '25 25'],
      ['s ss', '50 50'],
      ['a A', 'pm PM'],
      ['[the] DDDo [day of the year]', 'the 45e day of the year']
      // ['LTS', '3:25:50 PM'],
      // ['L', '02/14/2010'],
      // ['LL', 'February 14, 2010'],
      // ['LLL', 'February 14, 2010 3:25 PM'],
      // ['LLLL', 'Sunday, February 14, 2010 3:25 PM'],
      // ['l', '2/14/2010'],
      // ['ll', 'Feb 14, 2010'],
      // ['lll', 'Feb 14, 2010 3:25 PM'],
      // ['llll', 'Sun, Feb 14, 2010 3:25 PM']
    ];
    const date = new Date(2010, 1, 14, 15, 25, 50, 125);

    for (let i = 0; i < expected.length; i++) {
      expect(formatDate(date, expected[i][0], localeAbbr)).toBe(
        expected[i][1],
        `${expected[i][0]} ---> ${expected[i][1]}`
      );
    }
  });

  it('format ordinal', () => {
    expect(formatDate(new Date(2011, 0, 1), 'DDDo', localeAbbr)).toBe(
      '1a',
      '1a'
    );
    expect(formatDate(new Date(2011, 0, 2), 'DDDo', localeAbbr)).toBe(
      '2a',
      '2a'
    );
    expect(formatDate(new Date(2011, 0, 3), 'DDDo', localeAbbr)).toBe(
      '3e',
      '3e'
    );
    expect(formatDate(new Date(2011, 0, 4), 'DDDo', localeAbbr)).toBe(
      '4e',
      '4e'
    );
    expect(formatDate(new Date(2011, 0, 5), 'DDDo', localeAbbr)).toBe(
      '5e',
      '5e'
    );
    expect(formatDate(new Date(2011, 0, 6), 'DDDo', localeAbbr)).toBe(
      '6e',
      '6e'
    );
    expect(formatDate(new Date(2011, 0, 7), 'DDDo', localeAbbr)).toBe(
      '7e',
      '7e'
    );
    expect(formatDate(new Date(2011, 0, 8), 'DDDo', localeAbbr)).toBe(
      '8e',
      '8e'
    );
    expect(formatDate(new Date(2011, 0, 9), 'DDDo', localeAbbr)).toBe(
      '9e',
      '9e'
    );
    expect(formatDate(new Date(2011, 0, 10), 'DDDo', localeAbbr)).toBe(
      '10e',
      '10e'
    );

    expect(formatDate(new Date(2011, 0, 11), 'DDDo', localeAbbr)).toBe(
      '11e',
      '11e'
    );
    expect(formatDate(new Date(2011, 0, 12), 'DDDo', localeAbbr)).toBe(
      '12e',
      '12e'
    );
    expect(formatDate(new Date(2011, 0, 13), 'DDDo', localeAbbr)).toBe(
      '13e',
      '13e'
    );
    expect(formatDate(new Date(2011, 0, 14), 'DDDo', localeAbbr)).toBe(
      '14e',
      '14e'
    );
    expect(formatDate(new Date(2011, 0, 15), 'DDDo', localeAbbr)).toBe(
      '15e',
      '15e'
    );
    expect(formatDate(new Date(2011, 0, 16), 'DDDo', localeAbbr)).toBe(
      '16e',
      '16e'
    );
    expect(formatDate(new Date(2011, 0, 17), 'DDDo', localeAbbr)).toBe(
      '17e',
      '17e'
    );
    expect(formatDate(new Date(2011, 0, 18), 'DDDo', localeAbbr)).toBe(
      '18e',
      '18e'
    );
    expect(formatDate(new Date(2011, 0, 19), 'DDDo', localeAbbr)).toBe(
      '19e',
      '19e'
    );
    expect(formatDate(new Date(2011, 0, 20), 'DDDo', localeAbbr)).toBe(
      '20e',
      '20e'
    );

    expect(formatDate(new Date(2011, 0, 21), 'DDDo', localeAbbr)).toBe(
      '21a',
      '21a'
    );
    expect(formatDate(new Date(2011, 0, 22), 'DDDo', localeAbbr)).toBe(
      '22a',
      '22a'
    );
    expect(formatDate(new Date(2011, 0, 23), 'DDDo', localeAbbr)).toBe(
      '23e',
      '23e'
    );
    expect(formatDate(new Date(2011, 0, 24), 'DDDo', localeAbbr)).toBe(
      '24e',
      '24e'
    );
    expect(formatDate(new Date(2011, 0, 25), 'DDDo', localeAbbr)).toBe(
      '25e',
      '25e'
    );
    expect(formatDate(new Date(2011, 0, 26), 'DDDo', localeAbbr)).toBe(
      '26e',
      '26e'
    );
    expect(formatDate(new Date(2011, 0, 27), 'DDDo', localeAbbr)).toBe(
      '27e',
      '27e'
    );
    expect(formatDate(new Date(2011, 0, 28), 'DDDo', localeAbbr)).toBe(
      '28e',
      '28e'
    );
    expect(formatDate(new Date(2011, 0, 29), 'DDDo', localeAbbr)).toBe(
      '29e',
      '29e'
    );
    expect(formatDate(new Date(2011, 0, 30), 'DDDo', localeAbbr)).toBe(
      '30e',
      '30e'
    );

    expect(formatDate(new Date(2011, 0, 31), 'DDDo', localeAbbr)).toBe(
      '31a',
      '31a'
    );
  });

  it('format month', () => {
    const expected = 'januari jan_februari feb_mars mar_april apr_maj maj_juni jun_juli jul_augusti aug_september sep_oktober okt_november nov_december dec'.split(
      '_'
    );

    for (let i = 0; i < expected.length; i++) {
      expect(formatDate(new Date(2011, i, 1), 'MMMM MMM', localeAbbr)).toBe(
        expected[i],
        expected[i]
      );
    }
  });

  it('format week', () => {
    const expected = 'söndag sön sö_måndag mån må_tisdag tis ti_onsdag ons on_torsdag tor to_fredag fre fr_lördag lör lö'.split(
      '_'
    );

    for (let i = 0; i < expected.length; i++) {
      expect(
        formatDate(new Date(2011, 0, i + 2), 'dddd ddd dd', localeAbbr)
      ).toBe(expected[i], expected[i]);
    }
  });

  it('weeks year starting monday format', () => {
    expect(formatDate(new Date(2012, 0, 2), 'w ww wo', localeAbbr)).toBe(
      '1 01 1a',
      'Jan  2 2012 should be week 1'
    );
    expect(formatDate(new Date(2012, 0, 8), 'w ww wo', localeAbbr)).toBe(
      '1 01 1a',
      'Jan  8 2012 should be week 1'
    );
    expect(formatDate(new Date(2012, 0, 9), 'w ww wo', localeAbbr)).toBe(
      '2 02 2a',
      'Jan  9 2012 should be week 2'
    );
    expect(formatDate(new Date(2012, 0, 15), 'w ww wo', localeAbbr)).toBe(
      '2 02 2a',
      'Jan 15 2012 should be week 2'
    );
    expect(formatDate(new Date(2012, 0, 16), 'w ww wo', localeAbbr)).toBe(
      '3 03 3e',
      'Jan 16 2012 should be week 3'
    );
  });
});
