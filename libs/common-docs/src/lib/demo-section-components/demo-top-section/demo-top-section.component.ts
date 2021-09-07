import { Component } from '@angular/core';
import { ContentSection } from '../../models/content-section.model';
import { ComponentsTopSection } from '../../models/components-top-section.model';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'demo-top-section',
  templateUrl: './demo-top-section.component.html'
})
export class DemoTopSectionComponent {
  sectionContent: ComponentsTopSection;

  constructor(public section: ContentSection) {
    this.sectionContent = section.content as ComponentsTopSection;
  }
}
