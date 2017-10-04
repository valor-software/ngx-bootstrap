import { Component } from '@angular/core';

@Component({
  selector: 'collapse-demo',
  templateUrl: './collapse-demo.component.html'
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
