/// <reference path="../../tsd.d.ts" />

import {Component, View, bootstrap, CORE_DIRECTIVES, NgStyle} from 'angular2/angular2';

import {progressbar} from '../../components/index';
import {Ng2BootstrapConfig, Theme} from '../../components/ng2-bootstrap-config';

let templates = {
  [Theme.BS3]: `
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
    </div>`,
  [Theme.BS4]: `
    <h3>In bootstrap 4 progress has a different concept, no inner text, no default transition animation</h3>
    <h3>Static</h3>
    <div class="row">
      <div class="col-sm-4">
        <progress class="progress" value="55" max="100"></progress>
      </div>
      <div class="col-sm-4">
        <progress class="progress progress-striped" value="22" max="100" type="warning">22%</progress>
      </div>
      <div class="col-sm-4">
        <progress class="progress progress-striped active" max="200" value="166" type="danger"><i>166 / 200</i></progress>
      </div>
    </div>

    <h3>Dynamic <button type="button" class="btn btn-sm btn-primary" (click)="random()">Randomize</button></h3>
    <progress class="progress progress-striped progress-animated" [max]="max" [value]="dynamic">
      <span style="color:white; white-space:nowrap;">{{dynamic}} / {{max}}</span>
    </progress>

    <small><em>No animation</em></small>
    <progress class="progress progress-success" [value]="dynamic" [max]="100"><b>{{dynamic}}%</b></progress>

    <small><em>Object (changes type based on value)</em></small>
    <progress class="progress progress-striped progress-animated active progress-{{ type }}" [value]="dynamic" [max]="max">
    {{type}} <i [hidden]="!showWarning">!!! Watch out !!!</i>
    </progress>

    <hr />
    <h3>Stacked <button type="button" class="btn btn-sm btn-primary" (click)="randomStacked()">Randomize</button></h3>
    <div class="row col-lg-12">
    <!-- todo: implement as component -->
      <progress *ng-for="#baz of stacked"
          class="progress progress-{{ baz.type }}"
          style="float: left;"
          [ng-style]="{width: baz.value + '%'}"
          [value]="baz.value" [max]="baz.max">
        <span [hidden]="baz.value < 5">{{baz.value}}%</span>
      </progress>
      <!-- gray background -->
      <progress class="progress" value="0" max="100" style="width: 100%;"></progress>
    </div>
  `
};

@Component({
  selector: 'progressbar-demo'
})
@View({
  template: `
    <br><hr/>
    <h2>Progressbar demo</h2>
    ${templates[Ng2BootstrapConfig.theme]}
  `,
  directives: [progressbar, CORE_DIRECTIVES, NgStyle]
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
    let total = 0;
    for (let i = 0, n = Math.floor((Math.random() * 4) + 1); i < n; i++) {
      let index = Math.floor((Math.random() * 4));
      let value = Math.floor((Math.random() * 30) + 1);
      total += value;
      this.stacked.push({
        value: value,
        max: value, // i !== (n - 1) ? value : 100,
        type: types[index]
      });
    }
  };
}
