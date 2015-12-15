/// <reference path="../../../tsd.d.ts" />
import { Component } from 'angular2/core';
import { CORE_DIRECTIVES } from 'angular2/common';
import { TAB_COMPONENTS } from '../../../ng2-bootstrap';

// webpack html imports
let template = require('./tabs-demo.html');

@Component({
  selector: 'tabs-demo',
  template: template,
  directives: [TAB_COMPONENTS, CORE_DIRECTIVES]
})
export class TabsDemo {
  private tabs:Array<any> = [
    {title: 'Dynamic Title 1', content: 'Dynamic content 1'},
    {title: 'Dynamic Title 2', content: 'Dynamic content 2', disabled: true}
  ];

  private alertMe() {
    setTimeout(function () {
      alert('You\'ve selected the alert tab!');
    });
  };
}
