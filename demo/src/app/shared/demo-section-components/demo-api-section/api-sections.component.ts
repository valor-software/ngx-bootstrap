import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ContentSection } from '../../models/content-section.model';
import { ComponentApi } from '../../models/components-api.model';

@Component({
  selector: 'api-sections',
  templateUrl: './api-sections.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ApiSectionsComponent {
  apiSectionContent: ComponentApi[];

  constructor(public section: ContentSection) {
    this.apiSectionContent = section.content;
  }
}
