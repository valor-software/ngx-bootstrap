import { Component } from '@angular/core';

@Component({
  selector: 'demo-popover-dynamic',
  templateUrl: './dynamic.html'
})
export class DemoPopoverDynamicComponent {
  title: string = 'Welcome word';
  content: string = 'Vivamus sagittis lacus vel augue laoreet rutrum faucibus.';
}
