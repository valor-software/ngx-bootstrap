import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CollapseModule} from '../collapse/collapse.module';
import {AccordionComponent} from './accordion.component';
import {AccordionPanelComponent} from './accordion-group.component';

@NgModule({
    imports: [CommonModule, CollapseModule],
    declarations: [AccordionComponent, AccordionPanelComponent],
    exports: [AccordionComponent, AccordionPanelComponent]
})
export class AccordionModule {}
