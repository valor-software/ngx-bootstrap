/// <reference path="../../../tsd.d.ts" />
import { Component } from 'angular2/core';
import { Collapse } from '../../../ng2-bootstrap';

// webpack html imports
let template = require('./collapse-demo.html');

@Component({
  selector: 'collapse-demo',
  directives: [Collapse],
  template: template
})
export class CollapseDemo {
  public isCollapsed:boolean = false;
}
