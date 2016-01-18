import {Directive, TemplateRef} from 'angular2/core';
import {Tab} from './tab.directive';

@Directive({selector: '[tab-heading]'})
export class TabHeading {
  constructor(public templateRef:TemplateRef, tab:Tab) {
    tab.headingRef = templateRef;
  }
}
