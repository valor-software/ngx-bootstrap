/// <reference path="../../tsd.d.ts" />

import {Component, View, bootstrap, CORE_DIRECTIVES} from 'angular2/angular2';

import {Alert} from '../../components/index';

@Component({
  selector: 'alert-demo'
})
@View({
  template: `
    <br><hr/>
    <h2>Alerts demo</h2>
    <span *ng-if="name">Hello, {{name}}!</span>
    <alert dismiss-on-timeout="3000">This alert will dismiss in 3s</alert>
    <alert *ng-for="#alert of alerts;#i = index" [type]="alert.type" (close)="closeAlert(i)">{{ alert.msg }}</alert>
    <div></div>
    <button type="button" class='btn btn-primary' (click)="addAlert()">Add Alert</button>
  `,
  directives: [Alert, CORE_DIRECTIVES]
})
export class AlertDemo {
  alerts:Array<Object>;

  constructor() {
    this.alerts = [
      {type: 'danger', msg: 'Oh snap! Change a few things up and try submitting again.'},
      {type: 'success', msg: 'Well done! You successfully read this important alert message.', closable: true}
    ];
  }

  closeAlert(i:number) {
    this.alerts.splice(i, 1);
  }

  addAlert() {
    this.alerts.push({msg: 'Another alert!', closable: true});
  }
}
