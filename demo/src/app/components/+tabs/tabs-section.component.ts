import { Component, ReflectiveInjector, Injector, ChangeDetectionStrategy } from '@angular/core';

import { demoComponentContent } from './tabs-section.list';
import { ContentSection } from '../../shared/models/content-section.model';

@Component({
  selector: 'tabs-section',
  templateUrl: './tabs-section.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TabsSectionComponent {
  name = 'Tabs';
  src = 'https://github.com/valor-software/ngx-bootstrap/tree/development/src/tabs';
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
