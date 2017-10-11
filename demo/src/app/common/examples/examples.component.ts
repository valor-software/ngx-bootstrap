import { Component, Input } from '@angular/core';

import { ComponentExample } from '../../common/models/components-examples.model';

@Component({
  selector: 'examples',
  templateUrl: './examples.component.html'
})
export class ExamplesComponent {
  @Input() examples: ComponentExample[];
  @Input() demos: any;
}
