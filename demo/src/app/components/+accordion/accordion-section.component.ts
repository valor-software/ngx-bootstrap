// todo: add more samples https://jqueryui.com/accordion/#default
// todo: add more samples http://getbootstrap.com/components/#panels-alternatives

import { ChangeDetectionStrategy, Component, Injector, ReflectiveInjector } from '@angular/core';
import { demoComponentContent } from './accordion-section.list';
import { ContentSection } from '../../models/content-section.model';

// webpack html imports
@Component({
  selector: 'accordion-section',
  templateUrl: './accordion-section.components.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccordionSectionComponent {
  name = 'Accordion';
  src = 'https://github.com/valor-software/ngx-bootstrap/tree/development/src/accordion';
  componentContent: any[] = demoComponentContent;
  content: any;

  constructor(private injector: Injector) { }

  sectionInjections(content: any) {
    return ReflectiveInjector.resolveAndCreate([{
      provide: ContentSection,
      useValue: content
    }], this.injector);
  }
}
