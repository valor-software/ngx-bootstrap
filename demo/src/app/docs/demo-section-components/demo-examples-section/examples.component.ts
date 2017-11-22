import { ChangeDetectionStrategy, Component, HostListener } from '@angular/core';

import { ContentSection } from '../../models/content-section.model';
import { ComponentExample } from '../../models/components-examples.model';

@Component({
  selector: 'examples',
  templateUrl: './examples.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExamplesComponent {
  examples: ComponentExample[];

  constructor(public section: ContentSection) {
    this.examples = section.content  as ComponentExample[];
  }

  @HostListener('click', ['$event'])
  preventEmptyHrefNav(event: Event) {
    if (event && event.target && (event.target as Element).getAttribute('href') === '#') {
      event.preventDefault();
    }
  }
}
