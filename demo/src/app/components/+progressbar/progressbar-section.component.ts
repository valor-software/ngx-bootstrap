import { ChangeDetectionStrategy, Component, Injector, ReflectiveInjector } from '@angular/core';
import { isBs3 } from 'ngx-bootstrap/utils';

import { demoComponentContentBs3, demoComponentContentBs4 } from './progressbar-section.list';
import { ContentSection } from '../../docs/models/content-section.model';

@Component({
  selector: 'progressbar-section',
  templateUrl: './progressbar-section.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProgressbarSectionComponent {
  name = 'Progressbar';
  src = 'https://github.com/valor-software/ngx-bootstrap/tree/development/src/progressbar';
  componentContentBs3: ContentSection[] = demoComponentContentBs3;
  componentContentBs4: ContentSection[] = demoComponentContentBs4;
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

  get isBs3(): boolean {
    if (typeof PR !== 'undefined') {
      setTimeout(() => PR.prettyPrint(), 10);
    }

    return isBs3();
  }
}
