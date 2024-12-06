import { Component } from '@angular/core';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'collapse-demo-animation',
  templateUrl: './animated.html',
  standalone: false
})
export class CollapseDemoAnimatedComponent {
  isCollapsed = false;
}
