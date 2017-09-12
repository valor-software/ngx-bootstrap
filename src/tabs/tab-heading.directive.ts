import { Directive, TemplateRef } from '@angular/core';

import { TabDirective } from './tab.directive';

/** Should be used to mark <ng-template> element as a template for tab heading */
@Directive({ selector: '[tabHeading]' })
export class TabHeadingDirective {
  templateRef: TemplateRef<any>;

  constructor(templateRef: TemplateRef<any>, tab: TabDirective) {
    tab.headingRef = templateRef;
  }
}
