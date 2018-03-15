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
    this.examples = section.content as ComponentExample[];
  }

  @HostListener('document:click', ['$event'])
  preventEmptyHrefNav(event: MouseEvent & {target: Element}): void {
    let element: Element = event.target;
    let preventNav = element.getAttribute('href') === '#';

    if (preventNav) {
      event.preventDefault();
      return;
    }

    if (element.tagName !== 'A') {
      while (element.parentElement && element !== document.body)  {
        if (preventNav) {
          event.preventDefault();
          return;
        }
        element = element.parentElement;
        preventNav = element.getAttribute('href') === '#';
      }
    }
  }
}

