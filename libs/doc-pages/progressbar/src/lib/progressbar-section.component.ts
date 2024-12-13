import { ChangeDetectionStrategy, Component, Injector } from '@angular/core';
import { demoComponentContent } from './progressbar-section.list';
import { ContentSection } from '@ngx-bootstrap-doc/docs';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'progressbar-section',
  templateUrl: './progressbar-section.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false
})
export class ProgressbarSectionComponent {
  name = 'Progressbar';
  src = 'https://github.com/valor-software/ngx-bootstrap/tree/development/src/progressbar';
  componentContent: ContentSection[] = demoComponentContent;

  _injectors = new Map<ContentSection, Injector>();

  constructor(private injector: Injector) {}

  sectionInjections(content: ContentSection) {
    if (this._injectors.has(content)) {
      return this._injectors.get(content);
    }

    const _injector = Injector.create({
      providers: [
        {
          provide: ContentSection,
          useValue: content
        }
      ],
      parent: this.injector
    });

    this._injectors.set(content, _injector);

    return _injector;
  }
}
