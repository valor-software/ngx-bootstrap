import { Component } from '@angular/core';

// webpack html imports
let template = require('./collapse-demo.html');

@Component({
  selector: 'collapse-demo',
  template: template
})
export class CollapseDemoComponent {
  public isCollapsed:boolean = false;

  public collapsed(event:any):void {
    console.log(event);
  }

  public expanded(event:any):void {
    console.log(event);
  }
}
