import { Component } from '@angular/core';

@Component({
  selector: 'demo-popover-events',
  templateUrl: './events.html'
})
export class DemoPopoverEventsComponent {
  message: string;

  onShown(): void {
    this.message = 'shown';
  }

  onHidden(): void {
    this.message = 'hidden';
  }
}
