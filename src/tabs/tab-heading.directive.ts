import { Directive, TemplateRef } from '@angular/core';

import { TabComponent } from './tab.component';

/** Should be used to mark <ng-template> element as a template for tab heading */
@Directive({ selector: '[tabHeading]' })
export class TabHeadingDirective {
  /* tslint:disable-next-line:no-any */
  templateRef: TemplateRef<any>;

  /* tslint:disable-next-line:no-any */
  constructor(templateRef: TemplateRef<any>, tab: TabComponent) {
    tab.headingRef = templateRef;
  }
}
