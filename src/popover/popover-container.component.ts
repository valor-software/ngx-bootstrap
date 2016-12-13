import { ChangeDetectionStrategy, Input, Component } from '@angular/core';

@Component({
  selector: 'popover-container',
  changeDetection: ChangeDetectionStrategy.OnPush,
  // tslint:disable-next-line
  host: {'[class]': '"popover in popover-" + placement', role: 'tooltip'},
  template: `
<div class="popover-arrow"></div>
<h3 class="popover-title">{{title}}</h3><div class="popover-content"><ng-content></ng-content></div>
    `
})
export class PopoverContainerComponent {
  @Input() public placement: string = 'top';
  @Input() public title: string;
}
