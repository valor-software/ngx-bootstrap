import {NgModule} from '@angular/core';
import {AccordionComponent} from './accordion.component';
import {AccordionPanelComponent} from './accordion-group.component';

@NgModule({
    declarations: [AccordionComponent, AccordionPanelComponent],
    exports: [AccordionComponent, AccordionPanelComponent]
})
export class AccordionModule {}
