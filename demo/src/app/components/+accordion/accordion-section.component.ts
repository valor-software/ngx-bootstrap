// todo: add more samples https://jqueryui.com/accordion/#default
// todo: add more samples http://getbootstrap.com/components/#panels-alternatives

import {
  ChangeDetectionStrategy, Component, Injector,
  ReflectiveInjector
} from '@angular/core';
import { demoComponentContent } from './accordion-section.list';
import { ContentSection } from '../../shared/models/content-section.model';

// webpack html imports
@Component({
  selector: 'accordion-section',
  templateUrl: './accordion-section.components.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccordionSectionComponent {
  name = 'Accordion';
  src = 'https://github.com/valor-software/ngx-bootstrap/tree/development/src/accordion';
  componentContent: ContentSection[] = demoComponentContent;
  content: any;

  _injectors = new Map<ContentSection, ReflectiveInjector>();

  constructor(private injector: Injector) { }

  sectionInjections(content: ContentSection) {
    if (this._injectors.has(content)) {
      return this._injectors.get(content);
    }

    const _injector = ReflectiveInjector.resolveAndCreate([{
      provide: ContentSection,
      useValue: content
    }], this.injector);

    this._injectors.set(content, _injector);

    return _injector;
  }
}
