import { Component, Inject, Input } from '@angular/core';
import { DOCUMENT } from '@angular/common';

import { ContentSection } from '../../models/content-section.model';

@Component({
  selector: 'add-nav',
  templateUrl: './add-nav.component.html'
})
export class AddNavComponent {
  @Input() componentContent: ContentSection[];

  constructor(@Inject(DOCUMENT) private document: Document) { }

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
