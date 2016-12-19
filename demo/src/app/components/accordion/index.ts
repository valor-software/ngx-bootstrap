import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared';

import { AccordionSectionComponent } from './accordion-section.component';
import { AccordionDemoComponent } from './demos/accordion-demo.component';
import { AccordionModule } from 'ng2-bootstrap';
import { NgApiDocModule } from '../../api-docs';
import { Ng2PageScrollModule } from 'ng2-page-scroll';
import { DEMO_COMPONENTS } from './demos/index';

@NgModule({
  declarations: [
    AccordionSectionComponent,
    AccordionDemoComponent,
    ...DEMO_COMPONENTS
  ],
  imports: [
    AccordionModule.forRoot(),
    NgApiDocModule,
    Ng2PageScrollModule,
    CommonModule,
    FormsModule,
    SharedModule
  ],
  exports: [AccordionSectionComponent]
})
export class DemoAccordionModule {
}
