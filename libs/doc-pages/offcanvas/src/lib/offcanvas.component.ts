import { ChangeDetectionStrategy, Component } from '@angular/core';

import { demoComponentContent } from './offcanvas-section.list';
import { ContentSection } from '@ngx-bootstrap-doc/docs';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'modal-section',
  templateUrl: './offcanvas.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OffcanvasSectionComponent {
  name = 'Offcanvas';
  // src = 'https://github.com/valor-software/ngx-bootstrap/tree/development/src/modal';
  componentContent: ContentSection[] = demoComponentContent;
}
