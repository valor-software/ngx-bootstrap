import { Component } from '@angular/core';

@Component({
  selector: 'datepicker-demo',
  templateUrl: './datepicker-demo.component.html'
})
export class DatepickerDemoComponent {
  dt: Date = new Date();
  minDate: Date = void 0;
  events: any[];
  tomorrow: Date;
  afterTomorrow: Date;
  dateDisabled: { date: Date; mode: string }[];
  formats: string[] = [
    'DD-MM-YYYY',
    'YYYY/MM/DD',
    'DD.MM.YYYY',
    'shortDate'
  ];
  format: string = this.formats[0];
  dateOptions: any = {
    formatYear: 'YY',
    startingDay: 1
  };
  private opened: boolean = false;

  constructor() {
    (this.tomorrow = new Date()).setDate(this.tomorrow.getDate() + 1);
    (this.afterTomorrow = new Date()).setDate(this.tomorrow.getDate() + 2);
    (this.minDate = new Date()).setDate(this.minDate.getDate() - 1000);
    this.dateDisabled = [];
    this.events = [
      { date: this.tomorrow, status: 'full' },
      { date: this.afterTomorrow, status: 'partially' }
    ];
  }

  getDate(): number {
    return (this.dt && this.dt.getTime()) || new Date().getTime();
  }

  today(): void {
    this.dt = new Date();
  }

  d20090824(): void {
    this.dt = new Date(2009, 7, 24);
  }

  disableTomorrow(): void {
    this.dateDisabled = [{ date: this.tomorrow, mode: 'day' }];
  }

  // todo: implement custom class cases
  getDayClass(date: any, mode: string): string {
    if (mode === 'day') {
      let dayToCheck = new Date(date).setHours(0, 0, 0, 0);

      for (let event of this.events) {
        let currentDay = new Date(event.date).setHours(0, 0, 0, 0);

        if (dayToCheck === currentDay) {
          return event.status;
        }
      }
    }

    return '';
  }

  disabled(date: Date, mode: string): boolean {
    return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
  }

  open(): void {
    this.opened = !this.opened;
  }

  clear(): void {
    this.dt = void 0;
    this.dateDisabled = undefined;
  }

  toggleMin(): void {
    this.dt = new Date(this.minDate.valueOf());
  }
}
