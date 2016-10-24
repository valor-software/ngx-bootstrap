import { ChangeDetectionStrategy, Component } from '@angular/core';

// webpack html imports
let template = require('./popover-demo.html');

@Component({
  selector: 'popover-demo',
  template: template,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PopoverDemoComponent {

  public dynamicPopover:string = 'Hello, World!';
  public dynamicPopoverTitleText:string = 'This is title';
  public dynamicPopoverText:string = 'dynamic';
  public htmlPopover:string = 'I\'ve been made <b>bold</b>!';
  public popoverModel:any = {text: 'foo', index: 1};

  public popoverStateChanged(state: boolean):void {
    console.log(`Popover is open: ${state}`);
  }
}
