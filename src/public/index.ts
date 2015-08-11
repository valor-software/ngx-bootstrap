/// <reference path="../../typings/tsd.d.ts" />

import {Component, View, bootstrap, coreDirectives} from 'angular2/angular2';

import {Alert} from 'src/components/alert/alert';

@Component({
  selector: 'app'
})
@View({
  template: `
    <span *ng-if="name">Hello, {{name}}!</span>
    <alert [dismiss-on-timeout]="3000">This alert will dismiss in 3s</alert>
    <alert *ng-for="#alert of alerts;#i = index" [type]="alert.type" (close)="closeAlert(i)">{{ alert.msg }}</alert>
    <div >
    </div>
    <button type="button" class='btn btn-default' (click)="addAlert()">Add Alert</button>
  `,
  directives: [Alert, coreDirectives]
})
export class Hello {
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

bootstrap(Hello);
