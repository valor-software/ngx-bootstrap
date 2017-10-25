import { ChangeDetectionStrategy, Component, Injector, ReflectiveInjector, ViewEncapsulation } from '@angular/core';

import { demoComponentContent } from './sortable-section.list';
import { ContentSection } from '../../shared/models/content-section.model';

@Component({
  selector: 'sortable-section',
  templateUrl: './sortable-section.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SortableSectionComponent {
  name = 'Sortable';
  src = 'https://github.com/valor-software/ngx-bootstrap/blob/development/src/sortable';
  componentContent: ContentSection[] = demoComponentContent;
  content: any;

  _injectors = new Map<ContentSection, ReflectiveInjector>();

  constructor(private injector: Injector) { }

  sectionInjections(content: ContentSection) {
    if (this._injectors.has(content)) {
      return this._injectors.get(content);
    }

    const _injector = ReflectiveInjector.resolveAndCreate([
      {
        provide: ContentSection,
        useValue: content
      }], this.injector);

    this._injectors.set(content, _injector);

    return _injector;
  }
}
