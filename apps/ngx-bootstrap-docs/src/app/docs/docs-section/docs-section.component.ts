import { ContentSection } from '../models/content-section.model';
import { Component, Injector, Input, ReflectiveInjector } from '@angular/core';

@Component({
  selector: 'docs-section',
  template: `
    <ng-container *ngFor="let section of content">
      <ng-container *ngComponentOutlet="section.outlet; injector: sectionInjections(section)">
      </ng-container>
    </ng-container>
    `
})
export class DocsSectionComponent {
  @Input() content: ContentSection[];

  _injectors = new Map<ContentSection, ReflectiveInjector>();

  constructor(private injector: Injector) {
  }

  sectionInjections(_content: ContentSection) {
    if (this._injectors.has(_content)) {
      return this._injectors.get(_content);
    }

    const _injector = ReflectiveInjector.resolveAndCreate([{
      provide: ContentSection,
      useValue: _content
    }], this.injector);

    this._injectors.set(_content, _injector);

    return _injector;
  }
}
