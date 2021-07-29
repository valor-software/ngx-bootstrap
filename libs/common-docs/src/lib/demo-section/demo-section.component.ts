import { Component, Input } from '@angular/core';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'demo-section',
  templateUrl: './demo-section.component.html'
})
export class DemoSectionComponent {
  @Input() name: string;
  @Input() src: string;
  @Input() html: string;
  @Input() ts: string;

  @Input() componentContent: unknown;
}
