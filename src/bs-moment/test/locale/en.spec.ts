// import { getLocale } from '../locale/locales.service';
import { formatDate } from '../../format';

const localeAbbr = 'en';
// const locale = getLocale(localeAbbr);

describe('moment - locale: en', () => {
  it('format', () => {
    const expected: string[][] = [
      [
        'dddd, MMMM Do YYYY, h:mm:ss a',
        'Sunday, February 14th 2010, 3:25:50 pm'
      ],
      ['ddd, hA', 'Sun, 3PM'],
      ['M Mo MM MMMM MMM', '2 2nd 02 February Feb'],
      ['YYYY YY', '2010 10'],
      ['D Do DD', '14 14th 14'],
      ['d do dddd ddd dd', '0 0th Sunday Sun Su'],
      ['DDD DDDo DDDD', '45 45th 045'],
      ['w wo ww', '8 8th 08'],
      ['h hh', '3 03'],
      ['H HH', '15 15'],
      ['m mm', '25 25'],
      ['s ss', '50 50'],
      ['a A', 'pm PM'],
      ['[the] DDDo [day of the year]', 'the 45th day of the year']
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
      '1st',
      '1st'
    );
    expect(formatDate(new Date(2011, 0, 2), 'DDDo', localeAbbr)).toBe(
      '2nd',
      '2nd'
    );
    expect(formatDate(new Date(2011, 0, 3), 'DDDo', localeAbbr)).toBe(
      '3rd',
      '3rd'
    );
    expect(formatDate(new Date(2011, 0, 4), 'DDDo', localeAbbr)).toBe(
      '4th',
      '4th'
    );
    expect(formatDate(new Date(2011, 0, 5), 'DDDo', localeAbbr)).toBe(
      '5th',
      '5th'
    );
    expect(formatDate(new Date(2011, 0, 6), 'DDDo', localeAbbr)).toBe(
      '6th',
      '6th'
    );
    expect(formatDate(new Date(2011, 0, 7), 'DDDo', localeAbbr)).toBe(
      '7th',
      '7th'
    );
    expect(formatDate(new Date(2011, 0, 8), 'DDDo', localeAbbr)).toBe(
      '8th',
      '8th'
    );
    expect(formatDate(new Date(2011, 0, 9), 'DDDo', localeAbbr)).toBe(
      '9th',
      '9th'
    );
    expect(formatDate(new Date(2011, 0, 10), 'DDDo', localeAbbr)).toBe(
      '10th',
      '10th'
    );

    expect(formatDate(new Date(2011, 0, 11), 'DDDo', localeAbbr)).toBe(
      '11th',
      '11th'
    );
    expect(formatDate(new Date(2011, 0, 12), 'DDDo', localeAbbr)).toBe(
      '12th',
      '12th'
    );
    expect(formatDate(new Date(2011, 0, 13), 'DDDo', localeAbbr)).toBe(
      '13th',
      '13th'
    );
    expect(formatDate(new Date(2011, 0, 14), 'DDDo', localeAbbr)).toBe(
      '14th',
      '14th'
    );
    expect(formatDate(new Date(2011, 0, 15), 'DDDo', localeAbbr)).toBe(
      '15th',
      '15th'
    );
    expect(formatDate(new Date(2011, 0, 16), 'DDDo', localeAbbr)).toBe(
      '16th',
      '16th'
    );
    expect(formatDate(new Date(2011, 0, 17), 'DDDo', localeAbbr)).toBe(
      '17th',
      '17th'
    );
    expect(formatDate(new Date(2011, 0, 18), 'DDDo', localeAbbr)).toBe(
      '18th',
      '18th'
    );
    expect(formatDate(new Date(2011, 0, 19), 'DDDo', localeAbbr)).toBe(
      '19th',
      '19th'
    );
    expect(formatDate(new Date(2011, 0, 20), 'DDDo', localeAbbr)).toBe(
      '20th',
      '20th'
    );

    expect(formatDate(new Date(2011, 0, 21), 'DDDo', localeAbbr)).toBe(
      '21st',
      '21st'
    );
    expect(formatDate(new Date(2011, 0, 22), 'DDDo', localeAbbr)).toBe(
      '22nd',
      '22nd'
    );
    expect(formatDate(new Date(2011, 0, 23), 'DDDo', localeAbbr)).toBe(
      '23rd',
      '23rd'
    );
    expect(formatDate(new Date(2011, 0, 24), 'DDDo', localeAbbr)).toBe(
      '24th',
      '24th'
    );
    expect(formatDate(new Date(2011, 0, 25), 'DDDo', localeAbbr)).toBe(
      '25th',
      '25th'
    );
    expect(formatDate(new Date(2011, 0, 26), 'DDDo', localeAbbr)).toBe(
      '26th',
      '26th'
    );
    expect(formatDate(new Date(2011, 0, 27), 'DDDo', localeAbbr)).toBe(
      '27th',
      '27th'
    );
    expect(formatDate(new Date(2011, 0, 28), 'DDDo', localeAbbr)).toBe(
      '28th',
      '28th'
    );
    expect(formatDate(new Date(2011, 0, 29), 'DDDo', localeAbbr)).toBe(
      '29th',
      '29th'
    );
    expect(formatDate(new Date(2011, 0, 30), 'DDDo', localeAbbr)).toBe(
      '30th',
      '30th'
    );

    expect(formatDate(new Date(2011, 0, 31), 'DDDo', localeAbbr)).toBe(
      '31st',
      '31st'
    );
  });

  it('format month', () => {
    const expected = 'January Jan_February Feb_March Mar_April Apr_May May_June Jun_July Jul_August Aug_September Sep_October Oct_November Nov_December Dec'.split(
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
    const expected = 'Sunday Sun Su_Monday Mon Mo_Tuesday Tue Tu_Wednesday Wed We_Thursday Thu Th_Friday Fri Fr_Saturday Sat Sa'.split(
      '_'
    );

    for (let i = 0; i < expected.length; i++) {
      expect(
        formatDate(new Date(2011, 0, i + 2), 'dddd ddd dd', localeAbbr)
      ).toBe(expected[i], expected[i]);
    }
  });

  it('weeks year starting sunday format', () => {
    expect(formatDate(new Date(2012, 0, 1), 'w ww wo', localeAbbr)).toBe(
      '1 01 1st',
      'Jan  1 2012 should be week 1'
    );
    expect(formatDate(new Date(2012, 0, 7), 'w ww wo', localeAbbr)).toBe(
      '1 01 1st',
      'Jan  7 2012 should be week 1'
    );
    expect(formatDate(new Date(2012, 0, 8), 'w ww wo', localeAbbr)).toBe(
      '2 02 2nd',
      'Jan  8 2012 should be week 2'
    );
    expect(formatDate(new Date(2012, 0, 14), 'w ww wo', localeAbbr)).toBe(
      '2 02 2nd',
      'Jan 14 2012 should be week 2'
    );
    expect(formatDate(new Date(2012, 0, 15), 'w ww wo', localeAbbr)).toBe(
      '3 03 3rd',
      'Jan 15 2012 should be week 3'
    );
  });
});
