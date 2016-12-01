import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CollapseModule } from '../collapse/collapse.module';
import { AccordionPanelComponent } from './accordion-group.component';
import { AccordionComponent } from './accordion.component';

@NgModule({
  imports: [CommonModule, CollapseModule],
  declarations: [AccordionComponent, AccordionPanelComponent],
  exports: [AccordionComponent, AccordionPanelComponent]
})
export class AccordionModule {
}
