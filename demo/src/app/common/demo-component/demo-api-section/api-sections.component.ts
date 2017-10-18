import { Component } from '@angular/core';
import { ContentSection } from '../../../models/content-section.model';
import { ComponentApi } from '../../../models/components-api.model';

@Component({
  selector: 'api-sections',
  templateUrl: './api-sections.component.html'
})
export class ApiSectionsComponent {
  apiSections: any; // Todo: investigate why ComponentApi[] not working

  constructor(public sections: ContentSection) {
    this.apiSections = sections.content;
  }
}
