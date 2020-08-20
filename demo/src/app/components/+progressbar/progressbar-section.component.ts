import { ChangeDetectionStrategy, Component, Injector, ReflectiveInjector } from '@angular/core';
import { isBs3 } from 'ngx-bootstrap/utils';

import { demoComponentContent } from './progressbar-section.list';
import { ContentSection } from '../../docs/models/content-section.model';

@Component({
  selector: 'progressbar-section',
  templateUrl: './progressbar-section.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProgressbarSectionComponent {
  name = 'Progressbar';
  src = 'https://github.com/valor-software/ngx-bootstrap/tree/development/src/progressbar';
  componentContent: ContentSection[] = demoComponentContent;
  content: any;
}
