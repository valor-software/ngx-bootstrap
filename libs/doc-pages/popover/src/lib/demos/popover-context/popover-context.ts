import { Component } from '@angular/core';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'demo-popover-context',
  templateUrl: './popover-context.html',
  standalone: false
})
export class DemoPopoverContextComponent {
  context = {
    message: 'Hello there!'
  };
}
