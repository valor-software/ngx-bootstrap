import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AccordionModule } from 'ng2-bootstrap';

import { SharedModule } from '../../shared';
import { AccordionSectionComponent } from './accordion-section.component';
import { AccordionDemoComponent } from './demos/accordion-demo.component';
import { DEMO_COMPONENTS } from './demos';

@NgModule({
  declarations: [
    AccordionSectionComponent,
    AccordionDemoComponent,
    ...DEMO_COMPONENTS
  ],
  imports: [
    AccordionModule.forRoot(),
    CommonModule,
    FormsModule,
    SharedModule
  ],
  exports: [AccordionSectionComponent]
})
export class DemoAccordionModule {
}
