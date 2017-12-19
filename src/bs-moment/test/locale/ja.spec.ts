import { defineLocale } from '../../locale/locales.service';
import { formatDate } from '../../format';
import { ja } from '../../i18n/ja';

const localeAbbr = 'ja';

describe('moment - locale: ja', () => {
  defineLocale(localeAbbr, ja);
  it('format', () => {
    const expected: string[][] = [
      [
        'dddd, MMMM Do YYYY, h:mm:ss a',
        '日曜日, 2月 14日 2010, 3:25:50 午後'
      ],
      ['ddd, hA', '日, 3午後'],
      ['M Mo MM MMMM MMM', '2 2 02 2月 2月'],
      ['YYYY YY', '2010 10'],
      ['D Do DD', '14 14日 14'],
      ['d do dddd ddd dd', '0 0日 日曜日 日 日'],
      ['DDD DDDo DDDD', '45 45日 045'],
      ['w wo ww', '8 8 08'],
      ['h hh', '3 03'],
      ['H HH', '15 15'],
      ['m mm', '25 25'],
      ['s ss', '50 50'],
      ['a A', '午後 午後'],
      ['[the] DDDo [day of the year]', 'the 45日 day of the year']
    ];
    const date = new Date(2010, 1, 14, 15, 25, 50, 125);

    for (let i = 0; i < expected.length; i++) {
      expect(formatDate(date, expected[i][0], localeAbbr)).toBe(
        expected[i][1],
        `${expected[i][0]} ---> ${expected[i][1]}`
      );
    }

    const amExpected: string[][] = [
      [
        'dddd, MMMM Do YYYY, h:mm:ss a',
        '日曜日, 2月 14日 2010, 3:25:50 午前'
      ],
      ['ddd, hA', '日, 3午前'],
      ['a A', '午前 午前']
    ];
    const amDate = new Date(2010, 1, 14, 3, 25, 50, 125);

    for (let i = 0; i < amExpected.length; i++) {
      expect(formatDate(amDate, amExpected[i][0], localeAbbr)).toBe(
        amExpected[i][1],
        `${amExpected[i][0]} ---> ${amExpected[i][1]}`
      );
    }
  });

  it('format ordinal', () => {
    expect(formatDate(new Date(2011, 0, 1), 'DDDo', localeAbbr)).toBe(
      '1日',
      '1st'
    );
    expect(formatDate(new Date(2011, 0, 2), 'DDDo', localeAbbr)).toBe(
      '2日',
      '2nd'
    );
    expect(formatDate(new Date(2011, 0, 3), 'DDDo', localeAbbr)).toBe(
      '3日',
      '3rd'
    );
    expect(formatDate(new Date(2011, 0, 4), 'DDDo', localeAbbr)).toBe(
      '4日',
      '4th'
    );
    expect(formatDate(new Date(2011, 0, 5), 'DDDo', localeAbbr)).toBe(
      '5日',
      '5th'
    );
    expect(formatDate(new Date(2011, 0, 6), 'DDDo', localeAbbr)).toBe(
      '6日',
      '6th'
    );
    expect(formatDate(new Date(2011, 0, 7), 'DDDo', localeAbbr)).toBe(
      '7日',
      '7th'
    );
    expect(formatDate(new Date(2011, 0, 8), 'DDDo', localeAbbr)).toBe(
      '8日',
      '8th'
    );
    expect(formatDate(new Date(2011, 0, 9), 'DDDo', localeAbbr)).toBe(
      '9日',
      '9th'
    );
    expect(formatDate(new Date(2011, 0, 10), 'DDDo', localeAbbr)).toBe(
      '10日',
      '10th'
    );

    expect(formatDate(new Date(2011, 0, 11), 'DDDo', localeAbbr)).toBe(
      '11日',
      '11th'
    );
    expect(formatDate(new Date(2011, 0, 12), 'DDDo', localeAbbr)).toBe(
      '12日',
      '12th'
    );
    expect(formatDate(new Date(2011, 0, 13), 'DDDo', localeAbbr)).toBe(
      '13日',
      '13th'
    );
    expect(formatDate(new Date(2011, 0, 14), 'DDDo', localeAbbr)).toBe(
      '14日',
      '14th'
    );
    expect(formatDate(new Date(2011, 0, 15), 'DDDo', localeAbbr)).toBe(
      '15日',
      '15th'
    );
    expect(formatDate(new Date(2011, 0, 16), 'DDDo', localeAbbr)).toBe(
      '16日',
      '16th'
    );
    expect(formatDate(new Date(2011, 0, 17), 'DDDo', localeAbbr)).toBe(
      '17日',
      '17th'
    );
    expect(formatDate(new Date(2011, 0, 18), 'DDDo', localeAbbr)).toBe(
      '18日',
      '18th'
    );
    expect(formatDate(new Date(2011, 0, 19), 'DDDo', localeAbbr)).toBe(
      '19日',
      '19th'
    );
    expect(formatDate(new Date(2011, 0, 20), 'DDDo', localeAbbr)).toBe(
      '20日',
      '20th'
    );

    expect(formatDate(new Date(2011, 0, 21), 'DDDo', localeAbbr)).toBe(
      '21日',
      '21st'
    );
    expect(formatDate(new Date(2011, 0, 22), 'DDDo', localeAbbr)).toBe(
      '22日',
      '22nd'
    );
    expect(formatDate(new Date(2011, 0, 23), 'DDDo', localeAbbr)).toBe(
      '23日',
      '23rd'
    );
    expect(formatDate(new Date(2011, 0, 24), 'DDDo', localeAbbr)).toBe(
      '24日',
      '24th'
    );
    expect(formatDate(new Date(2011, 0, 25), 'DDDo', localeAbbr)).toBe(
      '25日',
      '25th'
    );
    expect(formatDate(new Date(2011, 0, 26), 'DDDo', localeAbbr)).toBe(
      '26日',
      '26th'
    );
    expect(formatDate(new Date(2011, 0, 27), 'DDDo', localeAbbr)).toBe(
      '27日',
      '27th'
    );
    expect(formatDate(new Date(2011, 0, 28), 'DDDo', localeAbbr)).toBe(
      '28日',
      '28th'
    );
    expect(formatDate(new Date(2011, 0, 29), 'DDDo', localeAbbr)).toBe(
      '29日',
      '29th'
    );
    expect(formatDate(new Date(2011, 0, 30), 'DDDo', localeAbbr)).toBe(
      '30日',
      '30th'
    );

    expect(formatDate(new Date(2011, 0, 31), 'DDDo', localeAbbr)).toBe(
      '31日',
      '31st'
    );
  });

  it('format month', () => {
    const expected = '1月 1月_2月 2月_3月 3月_4月 4月_5月 5月_6月 6月_7月 7月_8月 8月_9月 9月_10月 10月_11月 11月_12月 12月'.split(
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
    const expected = '日曜日 日 日_月曜日 月 月_火曜日 火 火_水曜日 水 水_木曜日 木 木_金曜日 金 金_土曜日 土 土'.split(
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
      '1 01 1',
      'Jan  1 2012 should be week 1'
    );
    expect(formatDate(new Date(2012, 0, 7), 'w ww wo', localeAbbr)).toBe(
      '1 01 1',
      'Jan  7 2012 should be week 1'
    );
    expect(formatDate(new Date(2012, 0, 8), 'w ww wo', localeAbbr)).toBe(
      '2 02 2',
      'Jan  8 2012 should be week 2'
    );
    expect(formatDate(new Date(2012, 0, 14), 'w ww wo', localeAbbr)).toBe(
      '2 02 2',
      'Jan 14 2012 should be week 2'
    );
    expect(formatDate(new Date(2012, 0, 15), 'w ww wo', localeAbbr)).toBe(
      '3 03 3',
      'Jan 15 2012 should be week 3'
    );
  });

  it('isPM', () => {
    expect(ja.isPM('午後')).toBe(true);
    expect(ja.isPM('午前')).toBe(false);
  });


  it('preparse', () => {
    expect(ja.preparse('2017年01月02日')).toBe('2017/01/02');
    expect(ja.preparse('2017年01月02日03時04分')).toBe('2017/01/02 03:04');
    expect(ja.preparse('2017年01月02日03時04分05秒')).toBe('2017/01/02 03:04:05');
  });
});
