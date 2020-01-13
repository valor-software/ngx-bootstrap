import { flagDaysCalendar } from './flag-days-calendar';

describe('flag-days-calendar:', () => {

    it('should flag days as disabled when they are part of the datesDisabled', () => {
      const weekViewModel = {
        month: new Date('2019-02-01'),
        weeks: [
          {
            days: [
              { date: new Date('2019-02-07'), label: '2019-02-07' },
              { date: new Date('2019-02-08'), label: '2019-02-08'  },
              { date: new Date('2019-02-09'), label: '2019-02-09'  }
            ]}
        ],
        weekNumbers: [],
        weekdays: [],
        monthTitle: '',
        yearTitle: ''
      };
      const datesDisabled = [
        new Date('2019-02-07'),
        new Date('2019-02-09')
      ];
      const result = flagDaysCalendar(weekViewModel, {
        datesDisabled,
        isDisabled: false,
        minDate: new Date('2019-01-01'),
        maxDate: new Date('2019-12-31'),
        daysDisabled: [],
        hoveredDate: new Date('2019-02-06'),
        selectedDate: new Date('2019-02-05'),
        selectedRange: [],
        displayMonths: 1,
        monthIndex: 1,
        dateCustomClasses: []
      });

      expect(result.weeks[0].days.find(day => day.label === '2019-02-07').isDisabled).toBe(true);
      expect(result.weeks[0].days.find(day => day.label === '2019-02-08').isDisabled).toBe(false);
      expect(result.weeks[0].days.find(day => day.label === '2019-02-09').isDisabled).toBe(true);
    });
   });
