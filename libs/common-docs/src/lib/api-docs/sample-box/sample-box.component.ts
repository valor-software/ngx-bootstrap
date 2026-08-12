import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'ng-sample-box',
  templateUrl: './sample-box.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  standalone: false
})
export class SampleBoxComponent {
  @Input() ts?: string;
  @Input() html?: string;
  @Input() spec?: string;
  @Input() style?: string;
}
