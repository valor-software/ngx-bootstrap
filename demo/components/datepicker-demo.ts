/// <reference path="../../tsd.d.ts" />

import {Component, View, bootstrap, CORE_DIRECTIVES, FORM_DIRECTIVES} from 'angular2/angular2';
import * as moment from 'moment';

import {datepicker} from '../../components/index';

@Component({
  selector: 'datepicker-demo'
})
@View({
  template: `
<section id="datepicker">
    <div class="page-header">
        <h1>Datepicker</h1>
    </div>
    <div class="row">
        <div class="col-md-6 show-grid">
<style>
  .full button span {
    background-color: limegreen;
    border-radius: 32px;
    color: black;
  }
  .partially button span {
    background-color: orange;
    border-radius: 32px;
    color: black;
  }
</style>

<div>
    <pre>Selected date is: <em>{{dt | date:'fullDate'}}</em></pre>
    <h4>Inline</h4>
    <div style="display:inline-block; min-height:290px;">
        <datepicker [(ng-model)]="dt" [min-date]="minDate" [show-weeks]="true"></datepicker>
    </div>
    <!--<h4>Popup</h4>
    <div class="row">
        <div class="col-md-6">
            <p class="input-group">
                <input type="text" class="form-control"
                       [datepicker-popup]="format"
                       [(ng-model)]="dt"
                       [(is-open)]="opened"
                       min-date="minDate"
                       max-date="2020-06-22"
                       datepicker-options="dateOptions"
                       date-disabled="disabled(date, mode)"
                       close-text="Close" />
                <span class="input-group-btn">
                    <button type="button" class="btn btn-default"
                            (^click)="open()"><i class="glyphicon glyphicon-calendar"></i></button>
                </span>
            </p>
        </div>
        <div class="col-md-6">
             <p class="input-group">
                 <input type="date" class="form-control"
                        [datepicker-popup]
                        [(ng-model)]="dt"
                        [(is-open)]="opened"
                        min-date="minDate"
                        max-date="2020-06-22"
                        datepicker-options="dateOptions"
                        date-disabled="disabled(date, mode)"
                        close-text="Close" />
                 <span class="input-group-btn">
                     <button type="button" class="btn btn-default"
                             (^click)="open()">
                         <i class="glyphicon glyphicon-calendar"></i>
                     </button>
                 </span>
            </p>
        </div>
    </div>-->
    <hr />
    <button type="button" class="btn btn-sm btn-info" (click)="today()">Today</button>
    <button type="button" class="btn btn-sm btn-default" (click)="d20090824();">2009-08-24</button>
    <button type="button" class="btn btn-sm btn-danger" (click)="clear()">Clear</button>
    <button type="button" class="btn btn-sm btn-default" (click)="toggleMin()" tooltip="After today restriction">Min date</button>
</div>

        </div>
    </div>
    <div class="col-md-6">
    </div>
</section>
  `,
  directives: [datepicker, CORE_DIRECTIVES, FORM_DIRECTIVES]
})
export class DatePickerDemo {
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
    // todo: move to class defaults
    this.tomorrow = new Date();
    this.tomorrow.setDate(this.tomorrow.getDate() + 1);
    this.afterTomorrow = new Date();
    this.afterTomorrow.setDate(this.tomorrow.getDate() + 2);
    this.events = [
      {
        date: this.tomorrow,
        status: 'full'
      },
      {
        date: this.afterTomorrow,
        status: 'partially'
      }
    ];
    this.minDate = new Date();
    this.minDate.setDate(this.minDate.getDate() - 1000);
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
