/// <reference path="../../tsd.d.ts" />

import {Component, View, bootstrap, CORE_DIRECTIVES} from 'angular2/angular2';

import {Collapse} from '../../components/index';

@Component({
  selector: 'collapse-demo'
})
@View({
  template: `
    <br><hr/>
    <h2>Collapse demo</h2>
    <div>
      <button type="button" class="btn btn-default"
        (click)="isCollapsed = !isCollapsed">Toggle collapse</button>
      <hr>
      <div [collapse]="isCollapsed" class="card card-block card-header">
        <div class="well well-lg">Some content</div>
      </div>
    </div>
  `,
  directives: [Collapse, CORE_DIRECTIVES]
})
export class CollapseDemo {
  public isCollapsed:boolean = false;
}
