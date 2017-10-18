import { Component } from '@angular/core';
import { ContentSection } from '../../../models/content-section.model';

@Component({
  selector: 'demo-top-section',
  templateUrl: './demo-top-section.component.html'
})
export class DemoTopSectionComponent {
  constructor(public section: ContentSection) {}
}
