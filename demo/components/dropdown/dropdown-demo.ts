/// <reference path="../../../tsd.d.ts" />

import {Component, View, CORE_DIRECTIVES} from 'angular2/angular2';

import {dropdown} from '../../../components/index';

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
