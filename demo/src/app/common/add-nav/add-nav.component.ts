import { Component, Input } from '@angular/core';
import { ContentSection } from '../../shared/models/content-section.model';

@Component({
  selector: 'add-nav',
  templateUrl: './add-nav.component.html'
})
export class AddNavComponent {
  @Input() componentContent: ContentSection[];

  document: Document;

  goToSection(event): void {
    const item: HTMLElement = event.target;

    if (item.hasAttribute('ng-reflect-fragment')) {
      const anchor: string = item.getAttribute('ng-reflect-fragment');
      const target: HTMLElement = document.getElementById(anchor);
      target.scrollIntoView();
    }
  }
}
