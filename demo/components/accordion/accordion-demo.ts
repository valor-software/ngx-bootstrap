/// <reference path="../../../tsd.d.ts" />

import {
  Component, View,
  CORE_DIRECTIVES, FORM_DIRECTIVES, NgClass
} from 'angular2/angular2';

import {accordion} from '../../../ng2-bootstrap';

// webpack html imports
let template = require('./accordion-demo.html');

@Component({
  selector: 'accordion-demo'
})
@View({
  template: template,
  directives: [accordion, NgClass, CORE_DIRECTIVES, FORM_DIRECTIVES]
})
export class AccordionDemo {
  public oneAtATime:boolean = true;
  public items:Array<string> = ['Item 1', 'Item 2', 'Item 3'];

  public status:Object = {
    isFirstOpen: true,
    isFirstDisabled: false
  };

  public groups:Array<any> = [
    {
      title: 'Dynamic Group Header - 1',
      content: 'Dynamic Group Body - 1'
    },
    {
      title: 'Dynamic Group Header - 2',
      content: 'Dynamic Group Body - 2'
    }
  ];

  public addItem() {
    this.items.push(`Items ${this.items.length + 1}`);
  }
}
