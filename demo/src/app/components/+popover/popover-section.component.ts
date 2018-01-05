import { ChangeDetectionStrategy, Component } from '@angular/core';

import { demoComponentContent } from './popover-section.list';
import { ContentSection } from '../../docs/models/content-section.model';

@Component({
  selector: 'tooltip-section',
  templateUrl: './popover-section.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PopoverSectionComponent {
  name = 'Popover';
  src = 'https://github.com/valor-software/ngx-bootstrap/tree/development/src/popover';
  componentContent: ContentSection[] = demoComponentContent;
}
