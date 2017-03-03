import { Directive, TemplateRef } from '@angular/core';

import { TabComponent } from './tab.component';

/** Should be used to mark <template> element as a template for tab heading */
@Directive({selector: '[tabHeading]'})
export class TabHeadingDirective {
  public templateRef:TemplateRef<any>;

  public constructor(templateRef:TemplateRef<any>, tab:TabComponent) {
    tab.headingRef = templateRef;
  }
}
