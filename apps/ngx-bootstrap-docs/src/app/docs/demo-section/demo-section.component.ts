import { Component, Input } from '@angular/core';

@Component({
  selector: 'demo-section',
  templateUrl: './demo-section.component.html'
})
export class DemoSectionComponent {
  @Input() name: string;
  @Input() src: string;
  @Input() html: string;
  @Input() ts: string;

  @Input() componentContent: Object;
}
