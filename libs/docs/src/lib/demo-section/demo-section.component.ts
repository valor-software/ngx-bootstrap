import { Component, Input } from '@angular/core';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'demo-section',
  templateUrl: './demo-section.component.html'
})
export class DemoSectionComponent {
  @Input() name: string | undefined;
  @Input() src: string | undefined;
  @Input() html: string | undefined;
  @Input() ts: string | undefined;

  @Input() componentContent: unknown;
}
