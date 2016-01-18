import {Component, ChangeDetectionStrategy} from 'angular2/core';
import {CORE_DIRECTIVES} from 'angular2/common';
import {TAB_DIRECTIVES} from '../../../ng2-bootstrap';

// webpack html imports
let template = require('./tabs-demo.html');

@Component({
  selector: 'tabs-demo',
  directives: [TAB_DIRECTIVES, CORE_DIRECTIVES],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: template
})
export class TabsDemo {
  public tabs:Array<any> = [
    {title: 'Dynamic Title 1', content: 'Dynamic content 1'},
    {title: 'Dynamic Title 2', content: 'Dynamic content 2', disabled: true}
  ];

  public alertMe() {
    setTimeout(function () {
      alert('You\'ve selected the alert tab!');
    });
  };

  public setActiveTab(index:number) {
    this.tabs[index].active = true;
  }
}
