import { ChangeDetectionStrategy, Component, Injector, ReflectiveInjector } from '@angular/core';

import { ContentSection } from '../../models/content-section.model';
import { ComponentApi } from '../../models/components-api.model';

@Component({
  selector: 'api-sections',
  templateUrl: './api-sections.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ApiSectionsComponent {
  apiSectionsContent: ComponentApi[];

  _injectors = new Map<ComponentApi, ReflectiveInjector>();

  constructor(public section: ContentSection, private injector: Injector) {
    this.apiSectionsContent = section.content as ComponentApi[];
  }

  sectionInjections(_content: ComponentApi) {
    if (this._injectors.has(_content)) {
      return this._injectors.get(_content);
    }

    const _injector = ReflectiveInjector.resolveAndCreate([{
      provide: ComponentApi,
      useValue: _content
    }], this.injector);

    this._injectors.set(_content, _injector);

    return _injector;
  }
}
