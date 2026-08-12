import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'demo-dropdown-state-change-event',
  templateUrl: './state-change-event.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  standalone: false
})
export class DemoDropdownStateChangeEventComponent {
  text?: string;
  onOpenChange(data: boolean): void {
    this.text = data ? 'opened' : 'closed';
  }
}
