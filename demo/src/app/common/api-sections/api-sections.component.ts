import { Component, Input } from '@angular/core';

import { ComponentApi } from '../../models/components-api.model';

@Component({
  selector: 'api-sections',
  templateUrl: './api-sections.component.html'
})
export class ApiSectionsComponent {
  @Input() apiSections: ComponentApi[];
}
