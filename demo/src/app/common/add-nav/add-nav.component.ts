import { Component, Inject, Input, PLATFORM_ID } from '@angular/core';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';

import { ContentSection } from '../../docs/models/content-section.model';

@Component({
  selector: 'add-nav',
  templateUrl: './add-nav.component.html'
})
export class AddNavComponent {
  @Input() componentContent: ContentSection[];

  constructor(@Inject(DOCUMENT) private document: Document, @Inject(PLATFORM_ID) platformId: number) { }

  goToSection(event: Event): void {
    const item: HTMLElement = event.target as HTMLElement;

    if (item.dataset.anchor) {
      const anchor: string = item.dataset.anchor;
      const target: HTMLElement | null = this.document.getElementById(anchor);
      const header: HTMLElement | null = this.document.getElementById('header');

      if (target && header) {
        const targetPosY: number = target.offsetTop - header.offsetHeight - 6;
        if(isPlatformBrowser(platformId)){
            window.scrollTo(0, targetPosY);
        }
      }
    }
  }
}
