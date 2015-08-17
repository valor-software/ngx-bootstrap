/// <reference path="../../../typings/tsd.d.ts" />

import {Component, View, bootstrap, coreDirectives} from 'angular2/angular2';

import {progressbar} from 'src/components/progressbar/progressbar';

@Component({
  selector: 'progressbar-demo'
})
@View({
  template: `
    <hr/>
    <h2>Progressbar demo</h2>
    <div>
        <h3>Static</h3>
        <div class="row">
            <div class="col-sm-4"><progressbar value="55"></progressbar></div>
            <div class="col-sm-4"><progressbar class="progress-striped" value="22" type="warning">22%</progressbar></div>
            <div class="col-sm-4"><progressbar class="progress-striped active" max="200" value="166" type="danger"><i>166 / 200</i></progressbar></div>
        </div>

        <hr />
        <h3>Dynamic <button type="button" class="btn btn-sm btn-primary" (click)="random()">Randomize</button></h3>
        <progressbar [max]="max" [value]="dynamic"><span style="color:white; white-space:nowrap;">{{dynamic}} / {{max}}</span></progressbar>

        <small><em>No animation</em></small>
        <progressbar [animate]="false" [value]="dynamic" type="success"><b>{{dynamic}}%</b></progressbar>

        <small><em>Object (changes type based on value)</em></small>
        <progressbar class="progress-striped active" [value]="dynamic" [type]="type">{{type}} <i [hidden]="!showWarning">!!! Watch out !!!</i></progressbar>

        <hr />
        <h3>Stacked <button type="button" class="btn btn-sm btn-primary" (click)="randomStacked()">Randomize</button></h3>
        <bs-progress>
          <bar *ng-for="#baz of stacked" [value]="baz.value" [type]="baz.type">
            <span [hidden]="baz.value < 5">{{baz.value}}%</span>
          </bar>
        </bs-progress>
    </div>
  `,
  directives: [progressbar, coreDirectives]
})
export class ProgressbarDemo {
  public max:number = 200;
  public showWarning:boolean;
  public dynamic:number;
  public type:string;
  public stacked:Array<any> = [];

  constructor() {
    this.random();
    this.randomStacked();
  }

  private random() {
    let value = Math.floor((Math.random() * 100) + 1);
    let type;

    if (value < 25) {
      type = 'success';
    } else if (value < 50) {
      type = 'info';
    } else if (value < 75) {
      type = 'warning';
    } else {
      type = 'danger';
    }

    this.showWarning = (type === 'danger' || type === 'warning');
    this.dynamic = value;
    this.type = type;
  };

  private randomStacked() {
    let types = ['success', 'info', 'warning', 'danger'];

    this.stacked = [];
    for (let i = 0, n = Math.floor((Math.random() * 4) + 1); i < n; i++) {
      let index = Math.floor((Math.random() * 4));
      this.stacked.push({
        value: Math.floor((Math.random() * 30) + 1),
        type: types[index]
      });
    }
  };
}
