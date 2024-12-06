import { Component } from '@angular/core';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'demo-popover-custom-content',
  templateUrl: './custom-content.html',
  standalone: false
})
export class DemoPopoverCustomContentComponent {
  title = 'Welcome word';
  content = 'Vivamus sagittis lacus vel augue laoreet rutrum faucibus.';
}
