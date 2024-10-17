import { ModuleWithProviders, NgModule } from '@angular/core';

import { AccordionComponent } from './accordion.component';
import { AccordionPanelComponent } from './accordion-group.component';

@NgModule({
    imports: [AccordionComponent, AccordionPanelComponent],
    exports: [AccordionComponent, AccordionPanelComponent]
})
export class AccordionModule {
  // @deprecated method not required anymore, will be deleted in v19.0.0
  static forRoot(): ModuleWithProviders<AccordionModule> {
    return {
      ngModule: AccordionModule,
      providers: []
    };
  }
}
