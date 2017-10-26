import { Component, Inject, Input } from '@angular/core';
import { DOCUMENT } from '@angular/common';

import { ContentSection } from '../../docs/models/content-section.model';

@Component({
  selector: 'add-nav',
  templateUrl: './add-nav.component.html'
})
export class AddNavComponent {
  @Input() componentContent: ContentSection[];

  constructor(@Inject(DOCUMENT) private document: Document) { }

  goToSection(event): void {
    const item: HTMLElement = event.target;

    if (item.dataset.anchor) {
      const anchor: string = item.dataset.anchor;
      const target: HTMLElement = this.document.getElementById(anchor);
      const header: HTMLElement = this.document.getElementById('header');
      const headerIndent: number = header.offsetHeight + 6;
      this.document.body.scrollTop = target.offsetTop - headerIndent;
    }
  }
}
