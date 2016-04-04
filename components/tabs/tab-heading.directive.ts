import {Directive, TemplateRef} from 'angular2/core';
import {Tab} from './tab.directive';

@Directive({selector: '[tabHeading]'})
export class TabHeading {
  public templateRef:TemplateRef;
  public constructor(templateRef:TemplateRef, tab:Tab) {
    tab.headingRef = templateRef;
  }
}
