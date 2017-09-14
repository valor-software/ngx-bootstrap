import { Component } from '@angular/core';

@Component({
  selector: 'demo-popover-dynamic',
  templateUrl: './dynamic.html'
})
export class DemoPopoverDynamicComponent {
  public title: string = 'Welcome word';
  public content: string = 'Vivamus sagittis lacus vel augue laoreet rutrum faucibus.';
}
