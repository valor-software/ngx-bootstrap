import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'inline-display-demo',
  templateUrl: './inline-display.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  standalone: false
})
export class InlineDisplayDemoComponent {
  isCollapsed = false;
  displayValue = 'block';

  setDisplay(value: string) {
    this.displayValue = value;
  }
}
