import { Component } from '@angular/core';

@Component({
  selector: 'demo-popover-context',
  templateUrl: './popover-context.html'
})
export class DemoPopoverContextComponent {
  context = {
    message: 'Hello there!'
  };
}
