// https://api.jqueryui.com/datepicker/
import { ChangeDetectionStrategy, Component, Injector, ReflectiveInjector } from '@angular/core';

import { demoComponentContent, demoComponentContentOld } from './datepicker-section.list';
import { ContentSection } from '../../shared/models/content-section.model';

@Component({
  selector: 'datepicker-section',
  templateUrl: './datepicker-section.component.html',
  changeDetection: ChangeDetectionStrategy.Default
})
export class DatepickerSectionComponent {
  name = 'Datepicker';
  src = 'https://github.com/valor-software/ngx-bootstrap/tree/development/src/datepicker';
  componentContentData: ContentSection[] = demoComponentContent;
  componentContent: ContentSection[] = demoComponentContent;
  componentContentOld: ContentSection[] = demoComponentContentOld;
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

  changeContent(name: string) {
    switch (name) {
      case('old'):
        this.componentContentData = demoComponentContentOld;
        break;
      case('new'):
      default:
        this.componentContentData = demoComponentContent;
    }
  }
}
