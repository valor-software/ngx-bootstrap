// https://api.jqueryui.com/datepicker/
import { ChangeDetectionStrategy, Component } from '@angular/core';

import { demoComponentContent, demoComponentContentOld } from './datepicker-section.list';
import { ContentSection } from '@ngx-bootstrap-doc/docs';

@Component({
  selector: 'datepicker-section',
  templateUrl: './datepicker-section.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DatepickerSectionComponent {
  name = 'Datepicker';
  src = 'https://github.com/valor-software/ngx-bootstrap/tree/development/src/datepicker';
  componentContent: ContentSection[] = demoComponentContent;

  changeContent(name: string) {
    switch (name) {
      case('old'):
        this.componentContent = demoComponentContentOld;
        break;
      case('new'):
      default:
        this.componentContent = demoComponentContent;
    }

    if (typeof window['PR'] !== 'undefined') {
      setTimeout(() => window['PR'].prettyPrint(), 10);
    }
  }
}
