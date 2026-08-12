import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'collapse-demo-animation',
  templateUrl: './animated.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  standalone: false
})
export class CollapseDemoAnimatedComponent {
  isCollapsed = false;
}
