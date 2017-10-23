import { ChangeDetectionStrategy, Component } from '@angular/core';

import { ContentSection } from '../../models/content-section.model';

@Component({
  selector: 'examples',
  templateUrl: './examples.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExamplesComponent {
  examples: any;

  constructor(public sections: ContentSection) {
    this.examples = sections.content;
  }
}
