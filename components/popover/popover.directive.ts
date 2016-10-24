import {
  Directive,
  EventEmitter,
  HostListener,
  Input,
  Output,
  TemplateRef,
  ViewContainerRef
} from '@angular/core';

import { PopoverContainerComponent } from './popover-container.component';
import { PopoverOptions } from './popover-options.class';
import { ComponentsHelper } from '../utils/components-helper.service';
import { TooltipDirective } from '../tooltip/tooltip.directive';

/* tslint:disable */
@Directive({
  selector: '[popover], [popoverHtml]',
  exportAs: 'bs-popover'
})
/* tslint:enable */
export class PopoverDirective extends TooltipDirective {
  /* tslint:disable */
  @Input('popover') public content: string;
  @Input('popoverHtml') public htmlContent: string | TemplateRef<any>;
  @Input('popoverPlacement') public placement: string = 'top';
  @Input('popoverIsOpen') public isOpen: boolean;
  @Input('popoverEnable') public enable: boolean = true;
  @Input('popoverAnimation') public animation: boolean = true;
  @Input('popoverAppendToBody') public appendToBody: boolean = false;
  @Input('popoverClass') public popupClass: string;
  @Input('popoverContext') public context: any;
  @Input('popoverPopupDelay') public delay: number = 0;
  @Input('popoverTitle') public title: string;

  @Output('popoverStateChanged') public stateChanged: EventEmitter<boolean> = new EventEmitter<boolean>();
  /* tslint:enable */

  public constructor(viewContainerRef: ViewContainerRef,
                     componentsHelper: ComponentsHelper) {
    super(viewContainerRef, componentsHelper);
  }

  @HostListener('focusin')
  @HostListener('mouseenter')
  public show(): void {
    super.show();
  }

  @HostListener('focusout')
  @HostListener('mouseleave')
  public hide(): void {
    super.hide();
  }

  protected get containerComponent(): any {
    return PopoverContainerComponent;
  }

  protected options(): PopoverOptions {
    let options = super.options() as PopoverOptions;
    options.title = this.title;
    return new PopoverOptions(options);
  }
}
