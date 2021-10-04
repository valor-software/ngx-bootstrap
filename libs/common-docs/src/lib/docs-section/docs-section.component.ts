import { ContentSection } from '../models/content-section.model';
import { Component, Injector, Input } from '@angular/core';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'docs-section',
  template: `
  <tabset class="example-tabset-box" *ngIf="content">
    <tab heading="Overview" [customClass]="'example-tabset'" >
      <ng-container *ngComponentOutlet="content[0].outlet; injector: sectionInjections(content[0])"></ng-container>
    </tab>
    <tab heading="Examples" [customClass]="'example-tabset'">
      <ng-container *ngComponentOutlet="content[1].outlet; injector: sectionInjections(content[1])"></ng-container>
    </tab>
    <tab heading="Api" [customClass]="'example-tabset'">
      <ng-container *ngComponentOutlet="content[2].outlet; injector: sectionInjections(content[2])"></ng-container>
    </tab>
  </tabset>
    `
})
export class DocsSectionComponent {
  @Input() content: ContentSection[] | undefined;
  _injectors = new Map<ContentSection, Injector>();

  constructor(private injector: Injector) {}

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
