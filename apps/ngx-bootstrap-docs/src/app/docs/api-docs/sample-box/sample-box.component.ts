import { Component, Input } from '@angular/core';

@Component({
  selector: 'ng-sample-box',
  templateUrl: './sample-box.component.html'
})
export class SampleBoxComponent {
  @Input() ts: string;
  @Input() html: string;
  @Input() spec: string;
  @Input() style: string;
}
