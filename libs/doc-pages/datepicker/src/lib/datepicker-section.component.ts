// https://api.jqueryui.com/datepicker/
import { ChangeDetectionStrategy, Component } from '@angular/core';

import { demoComponentContent } from './datepicker-section.list';
import { ContentSection } from '@ngx-bootstrap-doc/docs';


@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'datepicker-section',
  templateUrl: './datepicker-section.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false
})
export class DatepickerSectionComponent {
  name = 'Datepicker';
  src = 'https://github.com/valor-software/ngx-bootstrap/tree/development/src/datepicker';
  componentContent: ContentSection[] = demoComponentContent;
}
