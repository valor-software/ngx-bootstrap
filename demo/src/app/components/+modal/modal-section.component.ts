import { ChangeDetectionStrategy, Component, Injector, ReflectiveInjector } from '@angular/core';

import { demoComponentContent } from './modal-section.list';
import { ContentSection } from '../../shared/models/content-section.model';

@Component({
  selector: 'modal-section',
  templateUrl: './modal-section.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ModalSectionComponent {
  name = 'Modals';
  src = 'https://github.com/valor-software/ngx-bootstrap/tree/development/src/modal';
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
