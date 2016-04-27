import {Directive, TemplateRef} from 'angular2/core';
import {TabDirective} from './tab.directive';

@Directive({selector: '[tabHeading]'})
export class TabHeadingDirective {
  public templateRef:TemplateRef;
  public constructor(templateRef:TemplateRef, tab:TabDirective) {
    tab.headingRef = templateRef;
  }
}
