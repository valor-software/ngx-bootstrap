import { Component, Input } from '@angular/core';

@Component({
  selector: 'ng-sample-box',
  templateUrl: './sample-box.component.html'
})
export class SampleBoxComponent {
  @Input() public ts: string;
  @Input() public html: string;
  @Input() public spec: string;
}
