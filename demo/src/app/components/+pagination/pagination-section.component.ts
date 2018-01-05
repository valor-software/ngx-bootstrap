import { ChangeDetectionStrategy, Component } from '@angular/core';

import { demoComponentContent } from './pagination-section.list';
import { ContentSection } from '../../docs/models/content-section.model';

@Component({
  selector: 'pagination-section',
  templateUrl: './pagination-section.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaginationSectionComponent {
  name = 'Pagination';
  src = 'https://github.com/valor-software/ngx-bootstrap/tree/development/src/pagination';
  componentContent: ContentSection[] = demoComponentContent;
}
