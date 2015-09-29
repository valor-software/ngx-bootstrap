/// <reference path="../../../tsd.d.ts" />
import {Component, View} from 'angular2/angular2';
import {Collapse} from '../../../lib/index';

// webpack html imports
let template = require('./collapse-demo.html');

@Component({
  selector: 'collapse-demo'
})
@View({
  template: template,
  directives: [Collapse]
})
export class CollapseDemo {
  public isCollapsed:boolean = false;
}
