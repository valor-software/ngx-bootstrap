/// <reference path="../../tsd.d.ts" />

import {Component, View, bootstrap, CORE_DIRECTIVES, FORM_DIRECTIVES} from 'angular2/angular2';

import {Timepicker} from '../../components/index';

@Component({
  selector: 'timepicker-demo'
})
@View({
  template: `
    <br><hr/>
    <h2>Timepicker demo</h2>
    <div>
      <timepicker [(ng-model)]="mytime" (change)="changed()" [hour-step]="hstep" [minute-step]="mstep" [show-meridian]="ismeridian"></timepicker>

      <pre class="alert alert-info">Time is: {{mytime | date:'shortTime' }}</pre>

      <div class="row">
        <div class="col-xs-6">
            Hours step is:
          <select class="form-control" [(ng-model)]="hstep">
            <option *ng-for="#opt of options.hstep" [value]="opt">{{opt}}</option>
          </select>
        </div>
        <div class="col-xs-6">
            Minutes step is:
          <select class="form-control" [(ng-model)]="mstep">
            <option *ng-for="#opt of options.mstep" [value]="opt">{{opt}}</option>
          </select>
        </div>
      </div>

      <hr>

      <button type="button" class="btn btn-info" (click)="toggleMode()">12H / 24H</button>
      <button type="button" class="btn btn-default" (click)="update()">Set to 14:00</button>
      <button type="button" class="btn btn-danger" (click)="clear()">Clear</button>

    </div>
  `,
  directives: [Timepicker, CORE_DIRECTIVES, FORM_DIRECTIVES]
})
export class TimepickerDemo {
  private hstep = 1;
  private mstep = 15;
  private ismeridian = true;

  private mytime = new Date();
  private options = {
    hstep: [1, 2, 3],
    mstep: [1, 5, 10, 15, 25, 30]
  };

  private toggleMode() {
    this.ismeridian = !this.ismeridian;
  };

  private update() {
    let d = new Date();
    d.setHours(14);
    d.setMinutes(0);
    this.mytime = d;
  };

  private changed() {
    console.log('Time changed to: ' + this.mytime);
  };

  private clear () {
    this.mytime = null;
  };
}
