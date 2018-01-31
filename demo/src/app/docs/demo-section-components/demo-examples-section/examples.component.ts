import { ChangeDetectionStrategy, Component, HostListener } from '@angular/core';

import { ContentSection } from '../../models/content-section.model';
import { ComponentExample } from '../../models/components-examples.model';
import { isBs3 } from 'ngx-bootstrap/utils';

@Component({
  selector: 'examples',
  templateUrl: './examples.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExamplesComponent {
  examples: ComponentExample[];

  get isBs3(): boolean {
    return isBs3();
  }

  constructor(public section: ContentSection) {
    this.examples = section.content as ComponentExample[];
  }

  @HostListener('document:click', ['$event'])
  preventEmptyHrefNav(event: Event) {
    if (event && event.target && (event.target as Element).getAttribute('href') === '#') {
      event.preventDefault();
    }
  }
}
