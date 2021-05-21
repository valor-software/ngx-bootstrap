import { Component, Inject, Input } from '@angular/core';
import { DOCUMENT } from '@angular/common';

import { ContentSection } from '../../models/content-section.model';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'add-nav',
  templateUrl: './add-nav.component.html'
})
export class AddNavComponent {
  @Input() componentContent: ContentSection[];
  private document: Document;
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor(@Inject(DOCUMENT) document: any){ }

  goToSection(event: Event): void {
    const item: HTMLElement = event.target as HTMLElement;

    if (item.dataset.anchor) {
      const anchor: string = item.dataset.anchor;
      const target: HTMLElement | null = this.document.getElementById(anchor);
      const header: HTMLElement | null = this.document.getElementById('header');

      if (target && header) {
        const targetPosY: number = target.offsetTop - header.offsetHeight - 6;

        window.scrollTo(0, targetPosY);
      }
    }
  }
}
