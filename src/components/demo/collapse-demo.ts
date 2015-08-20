/// <reference path="../../../typings/tsd.d.ts" />

import {Component, View, bootstrap, coreDirectives} from 'angular2/angular2';

import {Collapse} from 'src/components/collapse/collapse';

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
      <div [collapse]="isCollapsed">
        <div class="well well-lg">Some content</div>
      </div>
    </div>
  `,
  directives: [Collapse, coreDirectives]
})
export class CollapseDemo {
  public isCollapsed:boolean = false;
}
