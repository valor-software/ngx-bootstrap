import { ChangeDetectionStrategy, Component } from '@angular/core';

import { demoComponentContent } from './tabs-section.list';
import { ContentSection } from '../../docs/models/content-section.model';

@Component({
  selector: 'tabs-section',
  templateUrl: './tabs-section.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TabsSectionComponent {
  name = 'Tabs';
  src = 'https://github.com/valor-software/ngx-bootstrap/tree/development/src/tabs';
  componentContent: ContentSection[] = demoComponentContent;
}
