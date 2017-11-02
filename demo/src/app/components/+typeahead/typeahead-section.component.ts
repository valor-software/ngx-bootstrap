import { ChangeDetectionStrategy, Component } from '@angular/core';

import { demoComponentContent } from './typeahead-section.list';
import { ContentSection } from '../../docs/models/content-section.model';

@Component({
  selector: 'typeahead-section',
  templateUrl: './typeahead-section.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TypeaheadSectionComponent {
  name = 'Typeahead';
  src = 'https://github.com/valor-software/ngx-bootstrap/tree/development/src/typeahead';
  componentContent: ContentSection[] = demoComponentContent;
}
