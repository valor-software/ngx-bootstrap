import { Component, Inject, Input, OnChanges, SimpleChanges } from '@angular/core';
import { DOCUMENT } from '@angular/common';

import { ContentSection } from '../../models/content-section.model';
import { ComponentExample } from '../../models/components-examples.model';
import { ComponentApi } from '../../models/components-api.model';

interface IComponentContent {
  name?: string;
  anchor?: string;
  outlet: any;
  description?: string;
  content: {anchor: string, title: string}[];
}

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'add-nav',
  templateUrl: './add-nav.component.html'
})
export class AddNavComponent implements OnChanges{
  @Input() componentContent?: ContentSection[];

  _componentContent: IComponentContent[] = [];
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor(@Inject(DOCUMENT) private document: Document){ }

  ngOnChanges(changes: SimpleChanges) {
    if (changes?.componentContent) {
      this._componentContent = this.mapComponentContent(changes.componentContent.currentValue);
    }
  }

  mapComponentContent(component: ContentSection[]): IComponentContent[] {
    return component?.map(item => {
      const result = {
        name: item.name,
        anchor: item.anchor,
        outlet: item.outlet,
        description: item.description,
        content: Array.isArray(item.content)
          ? (item.content as {anchor: string, title: string}[])
            .map((cont) => ({anchor: cont.anchor, title: cont.title}))
          : []
      };

      return result;
    });
  }

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
