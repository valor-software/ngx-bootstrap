import { ChangeDetectionStrategy, Component } from '@angular/core';

import { demoComponentContent } from './alerts-section.list';
import { ContentSection } from '../../docs/models/content-section.model';

@Component({
  selector: 'alert-section',
  templateUrl: './alerts-section.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AlertsSectionComponent {
  name = 'Alerts';
  src = 'https://github.com/valor-software/ngx-bootstrap/tree/development/src/alert';
  componentContent: ContentSection[] = demoComponentContent;
}
