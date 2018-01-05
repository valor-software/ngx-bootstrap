import { ChangeDetectionStrategy, Component, Injector, ReflectiveInjector } from '@angular/core';

import { demoComponentContent } from './tooltip-section.list';
import { ContentSection } from '../../docs/models/content-section.model';

@Component({
  selector: 'tooltip-section',
  templateUrl: './tooltip-section.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TooltipSectionComponent {
  name = 'Tooltip';
  src = 'https://github.com/valor-software/ngx-bootstrap/tree/development/src/tooltip';
  componentContent: ContentSection[] = demoComponentContent;
}
