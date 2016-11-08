import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared';

import { AccordionSectionComponent } from './accordion-section.component';
import { AccordionDemoComponent } from './demos/accordion-demo.component';
import { AccordionModule } from 'ng2-bootstrap';

@NgModule({
  declarations: [
    AccordionSectionComponent,
    AccordionDemoComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    AccordionModule
  ],
  exports: [AccordionSectionComponent]
})
export class DemoAccordionModule{}
