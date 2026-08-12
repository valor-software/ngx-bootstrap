import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'collapse-demo',
  templateUrl: './basic.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  standalone: false
})
export class CollapseDemoComponent {
  isCollapsed = false;
}
