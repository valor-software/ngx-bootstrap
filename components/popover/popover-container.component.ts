import {
  ChangeDetectorRef, Component, ElementRef, Inject
} from '@angular/core';

import { Ng2BootstrapConfig, Ng2BootstrapTheme } from '../ng2-bootstrap-config';
import { OPTIONS } from '../tooltip/tooltip-options.token';
import { TooltipContainerComponent } from '../tooltip/tooltip-container.component';
import { PopoverOptions } from './popover-options.class';

const TEMPLATE_OPTIONS: any = {
  [Ng2BootstrapTheme.BS4]: {
    ARROW_CLASS: 'popover-arrow'
  },
  [Ng2BootstrapTheme.BS3]: {
    ARROW_CLASS: 'arrow'
  }
};

@Component({
  selector: 'popover-container',
  template: `<div class="popover" role="tooltip"
     [ngStyle]="{top: top, left: left, display: display}"
     [ngClass]="classMap">
      <div class="{{ CURRENT_THEME_TEMPLATE.ARROW_CLASS }}"></div>
      <h3 *ngIf="title" class="popover-title" [innerHtml]="title"></h3>
      <div class="popover-content"
           *ngIf="htmlContent && !isTemplate"
           [innerHtml]="htmlContent">
      </div>
      <div class="popover-content"
           *ngIf="htmlContent && isTemplate">
        <template [ngTemplateOutlet]="htmlContent"
                  [ngOutletContext]="{model: context}">
        </template>
      </div>
      <div class="popover-content"
           *ngIf="content">
        {{content}}
      </div>
    </div>`
})
export class PopoverContainerComponent extends TooltipContainerComponent {
  public CURRENT_THEME_TEMPLATE: any = TEMPLATE_OPTIONS[Ng2BootstrapConfig.theme || Ng2BootstrapTheme.BS3];
  public title: string;

  public constructor(element: ElementRef,
                     cdr: ChangeDetectorRef,
                     @Inject(OPTIONS) options: PopoverOptions) {
    super(element, cdr, options);
    this.title = options.title;
  }
}
