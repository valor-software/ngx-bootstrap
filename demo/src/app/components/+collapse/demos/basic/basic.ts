import { Component } from '@angular/core';

@Component({
  selector: 'collapse-demo',
  templateUrl: './basic.html'
})
export class CollapseDemoComponent {
  isCollapsed: boolean = false;

  collapsed(event: any): void {
    console.log(event);
  }

  expanded(event: any): void {
    console.log(event);
  }
}
