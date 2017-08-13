import { TemplateRef } from '@angular/core';
import { TabDirective } from './tab.directive';
/** Should be used to mark <template> element as a template for tab heading */
export declare class TabHeadingDirective {
    templateRef: TemplateRef<any>;
    constructor(templateRef: TemplateRef<any>, tab: TabDirective);
}
