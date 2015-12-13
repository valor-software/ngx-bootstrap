/// <reference path="../../../tsd.d.ts" />

import {
  Component, View,
} from 'angular2/core';
import { CORE_DIRECTIVES } from 'angular2/common';

import {dropdown} from '../../../ng2-bootstrap';

// webpack html imports
let template = require('./dropdown-demo.html');

@Component({
  selector: 'dropdown-demo'
})
@View({
  template: template,
  directives: [dropdown, CORE_DIRECTIVES]
})
export class DropdownDemo {
  private disabled:boolean = false;
  private status:{isopen:boolean} = {isopen: false};
  private items:Array<string> = ['The first choice!', 'And another choice for you.', 'but wait! A third!'];

  private toggled(open:boolean):void {
    console.log('Dropdown is now: ', open);
  }

  private toggleDropdown($event:MouseEvent):void {
    $event.preventDefault();
    $event.stopPropagation();
    this.status.isopen = !this.status.isopen;
  }
}
