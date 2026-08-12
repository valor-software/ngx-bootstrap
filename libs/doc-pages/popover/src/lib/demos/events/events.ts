import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'demo-popover-events',
  templateUrl: './events.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  standalone: false
})
export class DemoPopoverEventsComponent {
  message?: string;

  onShown(): void {
    this.message = 'shown';
  }

  onHidden(): void {
    this.message = 'hidden';
  }
}
