/// <reference path="../../../tsd.d.ts" />

import {Component, View, CORE_DIRECTIVES, FORM_DIRECTIVES} from 'angular2/angular2';

import * as moment from 'moment';
import {datepicker} from '../../../ng2-bootstrap';

// webpack html imports
let template = require('./datepicker-demo.html');

@Component({
  selector: 'datepicker-demo'
})
@View({
  template: template,
  directives: [datepicker, CORE_DIRECTIVES, FORM_DIRECTIVES]
})
export class DatepickerDemo {
  public dt:Date = new Date();
  private minDate:Date = null;
  private events:Array<any>;
  private tomorrow:Date;
  private afterTomorrow:Date;
  private formats:Array<string> = ['DD-MM-YYYY', 'YYYY/MM/DD', 'DD.MM.YYYY', 'shortDate'];
  private format = this.formats[0];
  private dateOptions:any = {
    formatYear: 'YY',
    startingDay: 1
  };
  private opened:boolean = false;

  constructor() {
    (this.tomorrow = new Date()).setDate(this.tomorrow.getDate() + 1);
    (this.afterTomorrow = new Date()).setDate(this.tomorrow.getDate() + 2);
    (this.minDate = new Date()).setDate(this.minDate.getDate() - 1000);
    this.events = [
      {date: this.tomorrow, status: 'full'},
      {date: this.afterTomorrow, status: 'partially'}
    ];
  }

  private today() {
    this.dt = new Date();
  }

  private d20090824() {
    this.dt = moment('2009-08-24', 'YYYY-MM-DD').toDate();
  }

  // todo: implement custom class cases
  private getDayClass(date, mode) {
    if (mode === 'day') {
      let dayToCheck = new Date(date).setHours(0, 0, 0, 0);

      for (let i = 0; i < this.events.length; i++) {
        let currentDay = new Date(this.events[i].date).setHours(0, 0, 0, 0);

        if (dayToCheck === currentDay) {
          return this.events[i].status;
        }
      }
    }

    return '';
  }

  private disabled(date:Date, mode:string):boolean {
    return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
  }

  private open() {
    this.opened = !this.opened;
  }

  private clear() {
    this.dt = null;
  }

  private toggleMin() {
    this.dt = this.minDate;
  }
}
