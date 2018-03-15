import { Component } from '@angular/core';

@Component({
  selector: 'collapse-demo-events',
  templateUrl: './events.html'
})
export class CollapseDemoEventsComponent {
  isCollapsed = false;
  message: string;

  collapsed(): void {
    this.message = 'collapsed';
  }

  expanded(): void {
    this.message = 'expanded';
  }
}
