/* tslint:disable:use-view-encapsulation */
import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

import { demoComponentContent } from './sortable-section.list';
import { ContentSection } from '../../docs/models/content-section.model';

@Component({
  selector: 'sortable-section',
  templateUrl: './sortable-section.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SortableSectionComponent {
  name = 'Sortable';
  src = 'https://github.com/valor-software/ngx-bootstrap/blob/development/src/sortable';
  componentContent: ContentSection[] = demoComponentContent;
}
