import { Component } from '@angular/core';

@Component({
  selector: 'demo-popover-corner-placement',
  templateUrl: './corner-placement.html'
})
export class DemoPopoverCornerPlacementComponent {
  placements = [
    'top left',
    'top right',
    'right top',
    'right bottom',
    'bottom right',
    'bottom left',
    'left bottom',
    'left top'
  ]
  placement = 'top left';
}
