import { Directive, TemplateRef } from '@angular/core';

import { TabDirective } from './tab.directive';

/** Should be used to mark <ng-template> element as a template for tab heading */
@Directive({ selector: '[tabHeading]' })
export class TabHeadingDirective {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  templateRef?: TemplateRef<any>;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(templateRef: TemplateRef<any>, tab: TabDirective) {
    tab.headingRef = templateRef;
  }
}
