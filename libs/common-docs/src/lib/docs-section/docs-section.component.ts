import { ContentSection } from '../models/content-section.model';
import { Component, Injector, Input } from '@angular/core';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'docs-section',
  template: `
    <ng-container *ngFor="let section of content">
      <ng-container *ngComponentOutlet="section.outlet; injector: sectionInjections(section)">
      </ng-container>
    </ng-container>
    `
})
export class DocsSectionComponent {
  @Input() content: ContentSection[] | undefined;

  _injectors = new Map<ContentSection, Injector>();

  constructor(private injector: Injector) {
  }

  sectionInjections(_content: ContentSection): Injector {
    if (this._injectors.has(_content)) {
      return this._injectors.get(_content) as Injector;
    }

    const _injector = Injector.create([{
      provide: ContentSection,
      useValue: _content
    }], this.injector);

    this._injectors.set(_content, _injector);

    return _injector;
  }
}
