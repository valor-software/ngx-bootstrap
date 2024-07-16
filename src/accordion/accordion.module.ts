import { NgModule } from '@angular/core';

import { AccordionComponent } from './accordion.component';
import { AccordionPanelComponent } from './accordion-group.component';

@NgModule({
    imports: [AccordionComponent, AccordionPanelComponent],
    exports: [AccordionComponent, AccordionPanelComponent]
})
export class AccordionModule {}
